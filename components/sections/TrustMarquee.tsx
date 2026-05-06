/* eslint-disable @next/next/no-img-element */

// Real Figma logo exports. We only have 2 unique items so duplicate them
// across the row to fill the marquee.
const logos = [
  "/images/marquee/logo-1.png",
  "/images/marquee/logo-2.png",
  "/images/marquee/logo-1.png",
  "/images/marquee/logo-2.png",
  "/images/marquee/logo-1.png",
  "/images/marquee/logo-2.png",
];

export function TrustMarquee() {
  const items = [...logos, ...logos];
  return (
    <section className="relative -mt-2 py-16">
      <p className="text-center text-sm text-ink-400">
        Trusted by worldwide agency.
      </p>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-16">
          {items.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-6 w-auto opacity-80"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
