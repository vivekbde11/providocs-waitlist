"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function PrimaryButton({ children, className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={`group inline-flex items-center gap-3 rounded-pill bg-primary-gradient pl-6 pr-2 py-2 font-semibold text-white shadow-cta transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      <span>{children}</span>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-primary-500 transition group-hover:translate-x-0.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
  );
}

export function SecondaryButton({ children, className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center rounded-pill border border-primary px-7 py-3.5 font-semibold text-primary-500 transition hover:bg-primary/5 active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}
