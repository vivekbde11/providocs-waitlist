"use client";

import { useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";

const faqs = [
  {
    q: "How secure is my agency's data?",
    a: "Providocs is built on HIPAA-aligned infrastructure. All data is encrypted in transit and at rest, access is role-based, and we maintain audit trails for every record so you always know who touched what.",
  },
  {
    q: "Can my staff document on the go?",
    a: "Yes — the web app is fully responsive today, and the dedicated mobile app is one of the early-access features rolling out to waitlist members first.",
  },
  {
    q: "Is there a limit to the number of staff or clients I can add?",
    a: "Plans are designed to scale with your agency. There is no per-seat surprise pricing — pick a plan that fits your size and grow from there.",
  },
  {
    q: "Do you offer support if I have technical issues?",
    a: "Every Providocs account includes responsive email support. Larger agencies get dedicated onboarding and a Slack/Teams channel with our team.",
  },
  {
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Absolutely. You can change plans from your settings — upgrades take effect immediately, downgrades at the next billing cycle.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[56px]">
            Answers to your{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Questions
            </span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="rounded-2xl border border-line bg-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-ink-900">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink-500 transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-400">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
