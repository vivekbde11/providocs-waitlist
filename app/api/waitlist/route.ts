import { NextResponse } from "next/server";

/**
 * POST /api/waitlist
 *
 * Body shape:
 *   {
 *     name?: string,
 *     email: string,
 *     phone?: string,
 *     company?: string,
 *     state?: string,
 *     providerType?: string,
 *     clientCount?: string,
 *     challenge?: string,
 *     interests?: string[],
 *     message?: string
 *   }
 *
 * On each signup we do two things via the Brevo API:
 *   1. Email a rich HTML notification to BREVO_TO_EMAIL with all fields
 *   2. (If BREVO_LIST_ID is set) Upsert the lead as a contact in that list
 *      with custom attributes for phone, company, state, etc.
 *
 * Required env vars:
 *   - BREVO_API_KEY
 *   - BREVO_FROM_EMAIL  (VERIFIED sender in Brevo)
 *   - BREVO_TO_EMAIL
 *
 * Optional env vars:
 *   - BREVO_FROM_NAME   (default "Providocs Waitlist")
 *   - BREVO_TO_NAME     (default "Providocs Team")
 *   - BREVO_LIST_ID     (numeric Brevo contact list ID)
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const BREVO_BASE = "https://api.brevo.com/v3";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  state?: string;
  providerType?: string;
  clientCount?: string;
  challenge?: string;
  interests?: string[];
  message?: string;
};

function row(
  label: string,
  value: string | undefined,
  opts?: { rawHtml?: boolean }
) {
  let display: string;
  if (!value || !value.trim()) {
    display = "—";
  } else if (opts?.rawHtml) {
    display = value; // caller is responsible for safety
  } else {
    display = escapeHtml(value.trim());
  }
  return `
    <tr>
      <td style="padding:10px 0;color:#646768;border-top:1px solid #e4e4e7;width:200px;vertical-align:top;font-size:13px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-top:1px solid #e4e4e7;font-weight:600;font-size:14px;color:#101111;">${display}</td>
    </tr>
  `;
}

function formatDate(iso: string) {
  // e.g. "June 3, 2026 at 10:03 PM UTC"
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "2-digit",
    });
    return `${date} at ${time} UTC`;
  } catch {
    return iso;
  }
}

async function sendNotification(opts: {
  apiKey: string;
  data: Payload;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
}) {
  const { apiKey, data, fromName, fromEmail, toName, toEmail } = opts;
  const submittedAt = new Date().toISOString();
  const interestsList =
    data.interests && data.interests.length > 0
      ? data.interests.join(", ")
      : undefined;

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#101111;">
      <h2 style="margin:0 0 4px;color:#005954;font-size:22px;">New waitlist signup 🎉</h2>
      <p style="margin:0 0 24px;color:#646768;font-size:14px;">Someone just joined the Providocs waitlist.</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", data.name)}
        ${row(
          "Email",
          data.email
            ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#0099a8;text-decoration:none;">${escapeHtml(data.email)}</a>`
            : undefined,
          { rawHtml: true }
        )}
        ${row("Phone", data.phone)}
        ${row("Agency / Company", data.company)}
        ${row("State", data.state)}
        ${row("Provider type", data.providerType)}
        ${row("Clients / individuals served", data.clientCount)}
        ${row("Biggest challenge", data.challenge)}
        ${row("Interested in", interestsList)}
        ${row("Message", data.message)}
        ${row("Submitted at", formatDate(submittedAt))}
      </table>
      <p style="margin-top:28px;font-size:12px;color:#878b8c;">Sent automatically from your Providocs landing page.</p>
    </div>
  `;

  // Plain-text fallback so spam filters and screen readers see content too
  const text = [
    "New waitlist signup",
    "",
    `Name: ${data.name || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Agency / Company: ${data.company || "—"}`,
    `State: ${data.state || "—"}`,
    `Provider type: ${data.providerType || "—"}`,
    `Clients served: ${data.clientCount || "—"}`,
    `Biggest challenge: ${data.challenge || "—"}`,
    `Interested in: ${interestsList || "—"}`,
    `Message: ${data.message || "—"}`,
    `Submitted: ${formatDate(submittedAt)}`,
  ].join("\n");

  return fetch(`${BREVO_BASE}/smtp/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: fromName, email: fromEmail },
      to: [{ email: toEmail, name: toName }],
      replyTo: {
        email: data.email,
        name: data.name?.trim() || data.email || "",
      },
      subject: `New waitlist signup — ${data.name?.trim() || data.email}`,
      htmlContent: html,
      textContent: text,
      tags: ["providocs-waitlist"],
    }),
  });
}

async function upsertContact(opts: {
  apiKey: string;
  data: Payload;
  listId: number;
}) {
  const { apiKey, data, listId } = opts;
  if (!data.email) return null;

  const [firstName = "", ...rest] = (data.name ?? "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  // Use the standard Brevo SIB attributes (FIRSTNAME / LASTNAME / SMS) plus a
  // few custom ones. The custom attributes (COMPANY, STATE, etc.) will be
  // auto-created the first time you import a contact that has them — or you
  // can pre-define them in Brevo → Contacts → Settings → Contact attributes.
  const attributes: Record<string, unknown> = {};
  if (firstName) attributes.FIRSTNAME = firstName;
  if (lastName) attributes.LASTNAME = lastName;
  if (data.phone) attributes.SMS = data.phone;
  if (data.phone) attributes.PHONE = data.phone;
  if (data.company) attributes.COMPANY = data.company;
  if (data.state) attributes.STATE = data.state;
  if (data.providerType) attributes.PROVIDER_TYPE = data.providerType;
  if (data.clientCount) attributes.CLIENT_COUNT = data.clientCount;
  if (data.challenge) attributes.CHALLENGE = data.challenge;
  if (data.interests && data.interests.length > 0) {
    attributes.INTERESTS = data.interests.join(", ");
  }
  if (data.message) attributes.MESSAGE = data.message;

  return fetch(`${BREVO_BASE}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email: data.email,
      attributes,
      listIds: [listId],
      updateEnabled: true,
    }),
  });
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Payload;

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const toEmail = process.env.BREVO_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("[waitlist] missing Brevo env vars");
      return NextResponse.json(
        { error: "Waitlist isn't configured yet. Please try again shortly." },
        { status: 500 }
      );
    }

    const fromName = process.env.BREVO_FROM_NAME || "Providocs Waitlist";
    const toName = process.env.BREVO_TO_NAME || "Providocs Team";
    const listIdRaw = process.env.BREVO_LIST_ID;
    const listId = listIdRaw ? Number(listIdRaw) : null;

    // 1. Email notification
    const notifyRes = await sendNotification({
      apiKey,
      data,
      fromName,
      fromEmail,
      toName,
      toEmail,
    });

    if (!notifyRes.ok) {
      const detail = await notifyRes.json().catch(() => ({}));
      console.error("[waitlist] brevo email error", notifyRes.status, detail);
      return NextResponse.json(
        {
          error:
            "Couldn't send the notification right now. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    // 2. Optional: add to a Brevo contacts list (non-fatal)
    if (listId) {
      try {
        const contactRes = await upsertContact({ apiKey, data, listId });
        if (contactRes && !contactRes.ok) {
          const detail = await contactRes.json().catch(() => ({}));
          console.warn(
            "[waitlist] brevo contact upsert failed (non-fatal)",
            contactRes.status,
            detail
          );
        }
      } catch (err) {
        console.warn("[waitlist] brevo contact upsert threw", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] unexpected error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
