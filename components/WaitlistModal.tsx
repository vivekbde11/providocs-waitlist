"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useWaitlist } from "./WaitlistContext";

type Status = "idle" | "loading" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  state: string;
  providerType: string;
  clientCount: string;
  challenge: string;
  interests: string[];
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  state: "",
  providerType: "",
  clientCount: "",
  challenge: "",
  interests: [],
  message: "",
};

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
];

const PROVIDER_TYPES = [
  "DODD",
  "Group Home",
  "Home Care",
  "Behavioral Health",
  "Foster Care",
  "Independent Provider",
];

const CLIENT_RANGES = [
  "1 – 10",
  "11 – 25",
  "26 – 50",
  "51 – 100",
  "101 – 250",
  "250+",
];

const CHALLENGES = [
  "Documentation",
  "Scheduling",
  "Compliance",
  "Staffing",
  "Billing",
  "Communication",
];

const INTERESTS = [
  "Beta Access",
  "Demo",
  "Pricing Updates",
  "Early Access",
];

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-500">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-ink-300";

export function WaitlistModal() {
  const { open, setOpen } = useWaitlist();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  const reset = () => {
    setForm(initialForm);
    setStatus("idle");
    setErrorMsg(null);
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleInterest = (item: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item)
        ? f.interests.filter((i) => i !== item)
        : [...f.interests, item],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-ink-400 transition hover:bg-ink-100/40"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12l5 5L20 6"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-ink-900">
              You&apos;re on the list 🎉
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">
              Thanks for joining the Providocs waitlist. We&apos;ll be in touch
              with early-access details soon.
            </p>
            <button
              onClick={close}
              className="mt-7 w-full rounded-pill bg-primary-gradient py-3 font-semibold text-white shadow-cta"
              style={{
                background:
                  "linear-gradient(96deg, #6ee7c8 0%, #2bc7c0 50%, #1aa9aa 100%)",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <img
              src="/images/logo-mark.png"
              alt="Providocs"
              className="h-12 w-12"
            />
            <h3 className="mt-5 text-2xl font-bold text-ink-900">
              Join the waitlist
            </h3>
            <p className="mt-2 text-sm text-ink-400">
              Get early access, locked-in pricing, and a say in what we build
              next.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {/* Personal */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                </Field>
                <Field label="Work email" required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@youragency.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Phone number">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className={inputClass}
                  />
                </Field>
                <Field label="Agency / Company name">
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Caring Hands LLC"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="State">
                  <select
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a state…</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Type of provider">
                  <select
                    value={form.providerType}
                    onChange={(e) => update("providerType", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a type…</option>
                    {PROVIDER_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Number of clients / individuals served">
                <select
                  value={form.clientCount}
                  onChange={(e) => update("clientCount", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select a range…</option>
                  {CLIENT_RANGES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Biggest challenge right now">
                <select
                  value={form.challenge}
                  onChange={(e) => update("challenge", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select your biggest challenge…</option>
                  {CHALLENGES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <div>
                <span className="mb-2 block text-xs font-medium text-ink-500">
                  Interested in (select all that apply)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {INTERESTS.map((item) => {
                    const checked = form.interests.includes(item);
                    return (
                      <label
                        key={item}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                          checked
                            ? "border-primary-200 bg-tertiary-100/40 text-ink-900"
                            : "border-line bg-white text-ink-700 hover:border-primary-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleInterest(item)}
                        />
                        <span
                          className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition ${
                            checked
                              ? "border-primary bg-primary"
                              : "border-line bg-white"
                          }`}
                        >
                          {checked && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M4 12l5 5L20 6"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        {item}
                      </label>
                    );
                  })}
                </div>
              </div>

              <Field label="Anything else? (optional)">
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={3}
                  placeholder="Tell us about your agency or what you're hoping Providocs solves."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {errorMsg && (
                <div className="rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-pill py-3.5 font-semibold text-white shadow-cta transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(96deg, #6ee7c8 0%, #2bc7c0 50%, #1aa9aa 100%)",
                }}
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="3"
                      />
                      <path
                        d="M22 12a10 10 0 0 0-10-10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>Reserve my spot</>
                )}
              </button>

              <p className="text-center text-[11px] text-ink-300">
                We&apos;ll only email you about Providocs. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
