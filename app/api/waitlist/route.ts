import { NextResponse } from "next/server";

/**
 * POST /api/waitlist
 * Body: { email: string, name?: string }
 *
 * Two-step flow on every signup:
 *   1. Email a notification to BREVO_TO_EMAIL (so you know in real time).
 *   2. (Optional) Upsert the contact to a Brevo Contacts list so you can
 *      email everyone later as a campaign — only runs if BREVO_LIST_ID is set.
 *
 * Required env vars:
 *   - BREVO_API_KEY       (https://app.brevo.com/settings/keys/api)
 *   - BREVO_FROM_EMAIL    (a VERIFIED sender email in Brevo)
 *   - BREVO_TO_EMAIL      (where signup notifications should land)
 *
 * Optional env vars:
 *   - BREVO_FROM_NAME     (default "Providocs Waitlist")
 *   - BREVO_TO_NAME       (default "Providocs Team")
 *   - BREVO_LIST_ID       (numeric ID — when set, contact is also added to this list)
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const BREVO_BASE = "https://api.brevo.com/v3";

async function sendNotification(opts: {
  apiKey: string;
  email: string;
  name?: string;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
}) {
  const { apiKey, email, name, fromName, fromEmail, toName, toEmail } = opts;
  const safeName = name?.trim() ? escapeHtml(name.trim()) : "(not provided)";
  const safeEmail = escapeHtml(email);
  const submittedAt = new Date().toISOString();

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#101111;">
      <h2 style="margin:0 0 8px;color:#005954;">New waitlist signup 🎉</h2>
      <p style="margin:0 0 20px;color:#646768;">Someone just joined the Providocs waitlist.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:#646768;width:120px;">Name</td>
          <td style="padding:8px 0;font-weight:600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#646768;border-top:1px solid #e4e4e7;">Email</td>
          <td style="padding:8px 0;font-weight:600;border-top:1px solid #e4e4e7;">
            <a href="mailto:${safeEmail}" style="color:#0099a8;text-decoration:none;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#646768;border-top:1px solid #e4e4e7;">Submitted</td>
          <td style="padding:8px 0;border-top:1px solid #e4e4e7;">${submittedAt}</td>
        </tr>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#878b8c;">Sent automatically from your Providocs landing page.</p>
    </div>
  `;
  const text = [
    "New waitlist signup",
    "",
    `Name: ${name?.trim() || "(not provided)"}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt}`,
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
      replyTo: { email, name: name?.trim() || email },
      subject: `New waitlist signup — ${name?.trim() || email}`,
      htmlContent: html,
      textContent: text,
      tags: ["providocs-waitlist"],
    }),
  });
}

async function upsertContact(opts: {
  apiKey: string;
  email: string;
  name?: string;
  listId: number;
}) {
  const { apiKey, email, name, listId } = opts;
  const [firstName = "", ...rest] = (name ?? "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  // POST /contacts upserts via updateEnabled:true — creates a new contact if
  // it doesn't exist, or updates the listIds attribute of an existing one.
  return fetch(`${BREVO_BASE}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      attributes: {
        ...(firstName ? { FIRSTNAME: firstName } : {}),
        ...(lastName ? { LASTNAME: lastName } : {}),
      },
      listIds: [listId],
      updateEnabled: true,
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { email, name } = (await request.json()) as {
      email?: string;
      name?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
      email,
      name,
      fromName,
      fromEmail,
      toName,
      toEmail,
    });

    if (!notifyRes.ok) {
      const data = await notifyRes.json().catch(() => ({}));
      console.error("[waitlist] brevo email error", notifyRes.status, data);
      return NextResponse.json(
        {
          error:
            "Couldn't send the notification right now. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    // 2. (Optional) Add to a Brevo contacts list — non-fatal if it fails.
    if (listId) {
      try {
        const contactRes = await upsertContact({
          apiKey,
          email,
          name,
          listId,
        });
        if (!contactRes.ok) {
          const data = await contactRes.json().catch(() => ({}));
          console.warn(
            "[waitlist] brevo contact upsert failed (non-fatal)",
            contactRes.status,
            data
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
