import { Logo } from "../ui/Logo";

const cols = [
  {
    label: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    label: "Services",
    links: [
      "Documentation",
      "Compliance",
      "Scheduling",
      "Reporting",
    ],
  },
  {
    label: "Resources",
    links: ["Help center", "Blog", "Changelog"],
  },
];

const Social = ({ d }: { d: string }) => (
  <a
    href="#"
    className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition hover:bg-ink-100/50"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d={d} />
    </svg>
  </a>
);

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="footer" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              Built for waiver, behavioral health, and home & community-based
              service providers. Documentation, scheduling, and compliance —
              one platform.
            </p>
            <p className="mt-6 text-xs text-ink-300">© providocs inc</p>
          </div>

          {cols.map((c) => (
            <div key={c.label} className="md:col-span-2">
              <div className="text-xs font-bold uppercase tracking-widest text-primary-500">
                {c.label}
              </div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-ink-500 transition hover:text-primary-500"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <div className="flex items-center gap-1">
              <Social d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
              <Social d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14H7.5V10H10v7Zm-1.2-8a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8ZM18 17h-2.5v-3.6c0-.9 0-2-1.2-2s-1.4 1-1.4 2V17H10.4V10h2.4v1h.1c.3-.6 1.1-1.2 2.3-1.2 2.5 0 3 1.6 3 3.7V17Z" />
              <Social d="M22 5.8a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1A4.1 4.1 0 0 0 11.5 9a11.7 11.7 0 0 1-8.5-4.3 4.1 4.1 0 0 0 1.3 5.5A4 4 0 0 1 2.4 9.7v.1a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.5a11.7 11.7 0 0 0 6.3 1.8c7.6 0 11.7-6.3 11.7-11.7v-.5A8.4 8.4 0 0 0 22 5.8Z" />
              <Social d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm5.2 6.7H15a4 4 0 0 1-1.8-.5 6.6 6.6 0 0 1-1.7 0v6.6a3.3 3.3 0 1 1-3.3-3.3v2a1.3 1.3 0 1 0 1.3 1.3V6.5h2a4 4 0 0 0 3.7 2.2v2Z" />
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-pill border border-line bg-white px-3 py-2 text-sm font-medium text-ink-700">
              <span>🌐</span> English – En
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="text-ink-400"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-primary-gradient">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 px-6 py-4 text-xs text-white/90 md:flex-row md:items-center lg:px-10">
          <div>© {new Date().getFullYear()} Providocs Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
