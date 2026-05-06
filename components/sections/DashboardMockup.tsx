/**
 * Lightweight CSS replica of the Providocs dashboard frame from the Figma hero.
 * The Figma version is vector-only (no embedded screenshot), so this component
 * recreates the same visual hierarchy: sidebar nav, KPI cards, schedule list,
 * critical alerts column.
 */

import { Logo } from "../ui/Logo";

const sidebar = [
  { label: "Dashboard", active: true },
  { label: "Individuals" },
  { label: "Scheduling" },
  { label: "Documents" },
  { label: "Communication" },
  { label: "Reporting" },
  { label: "Help" },
  { label: "Settings" },
];

const kpis = [
  { label: "Total Clients", value: "40", sub: "Active today: 32" },
  { label: "Active Staff", value: "20", sub: "Available: 5" },
  { label: "Today's Task", value: "20", sub: "Completed task: 3" },
  { label: "Completion Rate", value: "98%", sub: "Above target" },
];

export function DashboardMockup() {
  return (
    <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-3 hidden border-r border-line bg-white p-4 md:block">
          <div className="px-2 pb-4">
            <Logo variant="mark" />
          </div>
          <ul className="space-y-1">
            {sidebar.map((s) => (
              <li
                key={s.label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  s.active
                    ? "bg-primary text-white"
                    : "text-ink-500 hover:bg-ink-100/40"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    s.active ? "bg-white" : "bg-ink-300"
                  }`}
                />
                {s.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="col-span-12 md:col-span-9">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-line px-6 py-3">
            <div className="text-xs text-ink-400">Dashboard / Dashboard</div>
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-ink-100/40 text-ink-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-200" />
                <div className="text-sm font-semibold text-ink-700">
                  John Miles
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-ink-900">
                  Dashboard
                </div>
                <div className="text-xs text-ink-400">
                  Monitor and manage your agency operations
                </div>
              </div>
              <div className="flex rounded-pill border border-line bg-white p-1 text-xs font-medium text-ink-400">
                {["Day", "Week", "Month", "Year"].map((t, i) => (
                  <button
                    key={t}
                    className={`rounded-pill px-3 py-1 ${
                      i === 0 ? "bg-primary text-white" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl border border-line bg-white p-4"
                >
                  <div className="text-[11px] font-medium text-ink-400">
                    {k.label}
                  </div>
                  <div className="mt-1 flex items-end justify-between">
                    <div className="text-2xl font-bold text-ink-900">
                      {k.value}
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-tertiary-100 text-primary-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M12 5v14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-ink-400">{k.sub}</div>
                  <div className="mt-1.5 h-1 rounded-full bg-tertiary-100">
                    <div className="h-1 w-1/2 rounded-full bg-primary-200" />
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule + Alerts */}
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-line p-4 lg:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M3 9h18M8 3v4M16 3v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Today&apos;s Client Schedule
                    <span className="rounded-pill bg-tertiary-100 px-2 py-0.5 text-[10px] font-medium text-primary-500">
                      3 Tasks
                    </span>
                  </div>
                  <button className="text-xs font-medium text-primary-500">
                    View all
                  </button>
                </div>
                <div className="rounded-xl bg-white p-3 ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-tertiary-100" />
                      <div>
                        <div className="text-sm font-semibold text-ink-700">
                          Stephanie Woods{" "}
                          <span className="ml-1 rounded-pill bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                            Active now
                          </span>
                        </div>
                        <div className="mt-0.5 text-[11px] text-ink-400">
                          Joe black · Started 09:24 AM · 33 Wanda Ave...
                        </div>
                      </div>
                    </div>
                    <button className="rounded-pill border border-line px-3 py-1 text-[11px] font-medium text-ink-700">
                      View details
                    </button>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-ink-100/60">
                    <div className="h-1.5 w-[35%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-ink-400">
                    <span>Progress</span>
                    <span>35% completed</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] text-ink-400">
                    {[
                      "Outcomes · 1/3",
                      "Supports · 0/2",
                      "Measurements · 3/5",
                      "Medication · 0/5",
                    ].map((c) => (
                      <div
                        key={c}
                        className="rounded-pill border border-line py-1 text-center"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-line p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                  Critical Alerts
                </div>
                <ul className="mt-3 space-y-2">
                  {[1, 2].map((i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-danger/5 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-danger/15 text-danger">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 8v4m0 4h.01"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ink-700">
                            1 unassigned client
                          </div>
                          <div className="text-[10px] text-ink-400">
                            2 hours ago
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
