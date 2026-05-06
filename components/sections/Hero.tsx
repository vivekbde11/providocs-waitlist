"use client";

/* eslint-disable @next/next/no-img-element */

import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { useWaitlist } from "../WaitlistContext";

const memberAvatars = [
  "/images/avatars/member-1.png",
  "/images/avatars/member-2.png",
  "/images/avatars/member-3.png",
];

export function Hero() {
  const { setOpen } = useWaitlist();

  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pt-32">
      {/*
        Background — the Figma export (Section-1.png) is a soft cloud + grid
        scene, but it lost some green saturation when exported. Layering a
        green-cyan radial gradient on top brings it back to the Figma look.
      */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 60% at 50% 90%, rgba(110, 231, 200, 0.55) 0%, rgba(110, 231, 200, 0) 70%),
            radial-gradient(ellipse 70% 50% at 50% 10%, rgba(43, 199, 192, 0.18) 0%, rgba(43, 199, 192, 0) 70%),
            url('/images/hero-bg.png')
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Joined chip */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2.5 rounded-pill bg-white/85 px-2.5 py-1.5 backdrop-blur-md ring-1 ring-line shadow-card">
            <div className="flex -space-x-2">
              {memberAvatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>
            <span className="pr-2 text-sm font-medium text-ink-700">
              Joined 5k+ Members
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-7 max-w-5xl text-center text-[44px] font-bold leading-[1.05] tracking-tighter2 text-ink-900 md:text-[72px]">
          <span className="font-serif italic font-medium text-primary-200">
            Providocs
          </span>{" "}
          Built by
          <br />
          Providers, for Providers
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-center text-[16px] leading-relaxed text-ink-400 md:text-[17px]">
          Simplify documentation, streamline operations, and stay compliant —
          without burning out you or your staff.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton onClick={() => setOpen(true)}>
            Get Free Access
          </PrimaryButton>
          <SecondaryButton onClick={() => setOpen(true)}>
            Join The Waitlist
          </SecondaryButton>
        </div>

        {/* Static dashboard image (the real Figma export) */}
        <div className="relative mt-14 md:mt-16">
          <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_30px_80px_-20px_rgba(0,89,84,0.18)]">
            <img
              src="/images/hero-dashboard.png"
              alt="Providocs dashboard preview"
              className="block h-auto w-full"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
