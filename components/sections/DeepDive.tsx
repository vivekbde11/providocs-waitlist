/* eslint-disable @next/next/no-img-element */

import { Eyebrow } from "../ui/Eyebrow";

/**
 * In Figma, each Deep Dive card contains a real PNG image of a dashboard
 * preview (you can see the image bounding box when you click them in Dev
 * Mode). To export them:
 *   1. In Figma, click the dashboard image inside the first card
 *      ("Simplify Daily Documentation").
 *   2. Right panel → Export → 2x PNG → Export
 *   3. Save it to public/images/dashboard-doc.png
 *   4. Repeat for the other 3 cards using the filenames listed below.
 *
 * The component is already wired to load these — once the files exist they
 * appear automatically on next page load.
 */

const items = [
  {
    title: "Simplify Daily Documentation",
    body: "Create, manage, and standardize progress notes, outcome notes, and service logs in one place.",
    img: "/images/dashboard-doc.png",
  },
  {
    title: "Centralize Your Team",
    body: "Manage staff access, agency settings, and workflows from one dashboard.",
    img: "/images/dashboard-team.png",
  },
  {
    title: "Reduce Admin Burnout",
    body: "Spend less time chasing paperwork and more time serving people.",
    img: "/images/dashboard-clients.png",
  },
  {
    title: "Stay Compliant",
    body: "Built with compliance in mind — so your staff document the right way, every time.",
    img: "/images/dashboard-compliance.png",
  },
];

export function DeepDive() {
  return (
    <section
      id="deep-dive"
      className="bg-gradient-to-b from-tertiary-100/40 to-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Features</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[56px]">
            Everything You Need to Run
            <br />
            Your{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Agency
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((it) => (
            <article
              key={it.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card"
            >
              <div className="px-6 pt-6">
                <h3 className="text-[18px] font-bold text-ink-900">
                  {it.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
                  {it.body}
                </p>
              </div>
              {/* mt-auto pushes the image to the bottom of the card so cards
                  in the same row line up cleanly even when the source images
                  have different aspect ratios */}
              <div className="mt-auto px-6 pt-5 pb-6">
                <img
                  src={it.img}
                  alt=""
                  className="block w-full rounded-xl"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
