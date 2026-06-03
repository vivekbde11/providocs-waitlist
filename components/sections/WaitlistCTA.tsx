"use client";

import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { LogoMark } from "../ui/Logo";
import { useWaitlist } from "../WaitlistContext";

export function WaitlistCTA() {
  const { setOpen } = useWaitlist();
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background — actual Figma export (clouds + radial dome) */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cta-bg.png')" }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center lg:px-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white shadow-card ring-1 ring-line">
          <LogoMark size={32} />
        </div>

        <span className="mt-5 inline-flex items-center gap-2 rounded-pill border border-primary-200 bg-white/85 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-primary-500 backdrop-blur">
          LIMITED SPOTS AVAILABLE
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tighter2 text-ink-900 md:text-[64px]">
          Get Grandfathered In
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-400">
          Join the waitlist for early access, beta pricing, and provider tools
          designed to simplify documentation, scheduling, compliance, and
          communication.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton onClick={() => setOpen(true)}>
            Get Free Access
          </PrimaryButton>
          <SecondaryButton onClick={() => setOpen(true)}>
            Join The Waitlist
          </SecondaryButton>
        </div>

        <p className="mt-7 text-[14px] text-ink-400">
          Providocs is actively evolving — your feedback helps shape what we
          build next.
        </p>
      </div>
    </section>
  );
}
