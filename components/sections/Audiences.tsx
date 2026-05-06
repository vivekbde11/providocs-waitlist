/* eslint-disable @next/next/no-img-element */

const audiences = [
  "Waiver service providers",
  "Behavioral health agencies",
  "Developmental disability providers",
  "Home & community-based service providers",
  "Agencies tired of duct-taping systems together",
];

const Check = () => (
  <img src="/images/icons/check.png" alt="" className="h-5 w-5 shrink-0" />
);

export function Audiences() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex items-center gap-6">
          <span className="hidden h-px flex-1 bg-tertiary-100 md:block" />
          <h2 className="text-center text-3xl font-bold tracking-tighter2 text-ink-900 md:text-[40px]">
            Made for{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Agencies
            </span>{" "}
            Like Yours
          </h2>
          <span className="hidden h-px flex-1 bg-tertiary-100 md:block" />
        </div>

        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
          {audiences.slice(0, 3).map((a) => (
            <li
              key={a}
              className="flex items-center gap-3 rounded-2xl bg-ink-100/30 px-4 py-3"
            >
              <Check />
              <span className="text-[14px] font-medium text-ink-700">{a}</span>
            </li>
          ))}
        </ul>
        <ul className="mx-auto mt-3 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {audiences.slice(3).map((a) => (
            <li
              key={a}
              className="flex items-center gap-3 rounded-2xl bg-ink-100/30 px-4 py-3"
            >
              <Check />
              <span className="text-[14px] font-medium text-ink-700">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
