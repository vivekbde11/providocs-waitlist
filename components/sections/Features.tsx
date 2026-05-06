"use client";

import { Eyebrow } from "../ui/Eyebrow";
import { useWaitlist } from "../WaitlistContext";

// Real Figma icon export (cyan-teal heart-in-rounded-square)
// eslint-disable-next-line @next/next/no-img-element
const FeatureIcon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/images/icon-wrapper.png" alt="" className="h-12 w-12" />
);

const cards = [
  {
    title: "No Bloated Software",
    body: "Only what you need — no unnecessary modules or confusing menus slowing your team down.",
  },
  {
    title: "No Unnecessary Clicks",
    body: "Every workflow is streamlined for speed. Get things done in seconds, not minutes.",
  },
  {
    title: "Just Tools That Work",
    body: "Purpose-built for healthcare operations. Reliable, intuitive, and battle-tested by providers.",
  },
  {
    title: "Reduce Admin Burnout",
    body: "Spend less time chasing paperwork and more time serving people.",
  },
];

export function Features() {
  const { setOpen } = useWaitlist();
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Features</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[56px]">
            A Platform Designed
            <br />
            For{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Providers
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {cards.map((c) => (
              <article
                key={c.title}
                className="dot-pattern-light rounded-3xl border border-line bg-white p-6 transition hover:shadow-card"
              >
                <FeatureIcon />
                <h3 className="mt-12 text-[18px] font-bold text-ink-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
                  {c.body}
                </p>
              </article>
            ))}
          </div>

          {/* Tall dark teal CTA card */}
          <article
            className="dot-pattern relative overflow-hidden rounded-3xl p-7 text-white"
            style={{ background: "#005954" }}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Join waitlist"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-primary-500 transition hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h3 className="mt-12 text-2xl font-bold leading-tight md:text-[28px]">
              Ready for better care?
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-white/80">
              Our commitment to innovation drives better outcomes for every
              client.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
