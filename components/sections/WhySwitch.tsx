/* eslint-disable @next/next/no-img-element */

import { Eyebrow } from "../ui/Eyebrow";

const traditional = [
  "Notes scattered across multiple tools and spreadsheets",
  "Manual processes increase compliance risk",
  "Staff management across disconnected systems",
  "Time wasted chasing paperwork",
  "No automated compliance reminders",
];

const providocs = [
  "All documentation in one unified platform",
  "Built-in compliance guidance for accurate records",
  "Centralized staff access and workflow management",
  "Reduced administrative workload",
  "Smart reminders for documentation deadlines",
];

// Use the actual Figma cross/check icons.
const Cross = () => (
  <img src="/images/icons/cross-1.png" alt="" className="h-5 w-5 shrink-0" />
);
const Check = () => (
  <img src="/images/icons/check.png" alt="" className="h-5 w-5 shrink-0" />
);

export function WhySwitch() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Why Switch</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[56px]">
            Why Providers Choose
            <br />
            the{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Providocs
            </span>
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-tertiary-100 bg-tertiary-100/30">
          <div className="grid gap-px bg-tertiary-100 md:grid-cols-2">
            <div className="bg-tertiary-100/60 p-8 md:p-10">
              <h3 className="text-xl font-bold text-ink-900">
                Traditional Systems
              </h3>
              <ul className="mt-6 space-y-4">
                {traditional.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Cross />
                    <span className="text-sm leading-relaxed text-ink-700">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10">
              <h3 className="text-xl font-bold text-ink-900">Providocs</h3>
              <ul className="mt-6 space-y-4">
                {providocs.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check />
                    <span className="text-sm leading-relaxed text-ink-700">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
