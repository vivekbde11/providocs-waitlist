"use client";

import { Logo } from "../ui/Logo";
import { useWaitlist } from "../WaitlistContext";

const navLinks = [
  { label: "About", href: "#story" },
  { label: "Services", href: "#features" },
  { label: "Features", href: "#deep-dive" },
  { label: "Blog", href: "#faq" },
];

export function Header() {
  const { setOpen } = useWaitlist();
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] font-medium text-ink-700 transition hover:text-primary-500"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-2 rounded-pill bg-primary-500 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          <span>Contact us</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-primary-500 transition group-hover:translate-x-0.5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}
