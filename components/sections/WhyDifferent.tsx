"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";

const tabs = [
  {
    id: "providers",
    label: "Built by Providers",
    title: "Built by Providers",
    body: "Created by agency owners and frontline providers who deal with audits, staffing shortages, compliance stress, and documentation overload every day.",
    profile: {
      name: "Michael Smith",
      avatar: "/images/avatars/john-miles.png",
      dob: "25/11/1985",
      phone: "+44 20 7946 0827",
      city: "London",
    },
  },
  {
    id: "workflows",
    label: "Designed for Real Workflows",
    title: "Designed for Real Workflows",
    body: "Workflows mirror how providers actually deliver care — from intake to documentation to compliance — instead of forcing you to adapt to the tool.",
    profile: {
      name: "Aisha Patel",
      avatar: "/images/avatars/stephanie.png",
      dob: "12/04/1992",
      phone: "+44 20 8123 4567",
      city: "Manchester",
    },
  },
  {
    id: "scales",
    label: "Scales With You",
    title: "Scales With You",
    body: "From a 5-person agency to a 500-person operation, Providocs grows with your team without surprise per-seat pricing or feature paywalls.",
    profile: {
      name: "Daniel Costa",
      avatar: "/images/avatars/avatar-small.png",
      dob: "03/02/1979",
      phone: "+44 20 7946 1122",
      city: "Bristol",
    },
  },
];

const InfoIcon = ({ d }: { d: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-primary-500"
  >
    <path d={d} />
  </svg>
);

export function WhyDifferent() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="bg-ink-100/20 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="lg:col-span-5">
          <Eyebrow>Features</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[52px]">
            Why Providocs
            <br />
            is{" "}
            <span className="font-serif italic font-medium text-primary-200">
              Different
            </span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-400">
            From audits to daily operations, Providocs brings structure and
            simplicity to the way provider agencies manage their work.
          </p>

          <div className="mt-8 space-y-3">
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left transition ${
                    isActive
                      ? "border-primary-200 bg-gradient-to-r from-tertiary-100/70 to-transparent shadow-card"
                      : "border-line bg-white hover:border-primary-200"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      isActive ? "bg-primary-200" : "bg-ink-100"
                    }`}
                  />
                  <span className="text-[15px] font-semibold text-ink-900">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <h3 className="text-xl font-bold text-ink-900">{tab.title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-400">
              {tab.body}
            </p>

            <div className="mt-6 rounded-2xl bg-tertiary-100/40 p-6">
              <div className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={tab.profile.avatar}
                    alt={tab.profile.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-card"
                  />
                  <div className="mt-3 text-[15px] font-bold text-ink-900">
                    {tab.profile.name}
                  </div>
                </div>

                <div className="mt-5 space-y-2.5 rounded-xl bg-tertiary-100/40 p-4 text-[13px] text-ink-700">
                  <div className="flex items-center gap-2.5">
                    <InfoIcon d="M3 5h18M3 12h18M3 19h18" />
                    {tab.profile.dob}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <InfoIcon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                    {tab.profile.phone}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <InfoIcon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    {tab.profile.city}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
