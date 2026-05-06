type Props = { children: React.ReactNode };

export function Eyebrow({ children }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-700 shadow-card">
      <span className="h-1.5 w-1.5 rounded-full bg-primary-200" />
      {children}
    </span>
  );
}
