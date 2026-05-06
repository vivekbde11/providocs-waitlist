/* eslint-disable @next/next/no-img-element */

import { Eyebrow } from "../ui/Eyebrow";

const left = [
  {
    title: "Billing & Claims Management",
    body: "Automate billing workflows and reduce errors.",
  },
  {
    title: "Mobile App for Staff",
    body: "Document services on the go from anywhere.",
  },
  {
    title: "AI Voice Documentation",
    body: "Staff can speak their progress notes instead of typing.",
  },
];

const right = [
  {
    title: "Smart Reminders",
    body: "Never miss documentation deadlines again.",
  },
  {
    title: "Staff Training Modules",
    body: "Train, assign modules, and track progress — in Providocs.",
  },
];

// Real Figma icon export — the cyan-teal clipboard-list icon.
const CardIcon = () => (
  <img src="/images/list.png" alt="" className="h-10 w-10" />
);

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="dot-pattern-light rounded-3xl bg-ink-100/20 p-5 ring-1 ring-line">
      <CardIcon />
      <h3 className="mt-4 text-[16px] font-bold text-ink-900">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{body}</p>
    </article>
  );
}

export function ComingSoon() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>What&apos;s Next</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[56px]">
            Coming Soon — And Early
            <br />
            Users{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Get It First
            </span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          <div className="space-y-5">
            {left.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </div>

          <div
            className="aspect-[3/4] overflow-hidden rounded-3xl bg-cover bg-center ring-1 ring-tertiary-100"
            style={{ backgroundImage: "url('/images/coming-soon.png')" }}
          />

          <div className="flex flex-col justify-start space-y-5">
            {right.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
