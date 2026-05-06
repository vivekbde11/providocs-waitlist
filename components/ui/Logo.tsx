/* eslint-disable @next/next/no-img-element */

type Props = {
  variant?: "header" | "footer" | "mark";
  className?: string;
};

/**
 * Logo uses the actual Figma exports (PNG with the green-cyan P-mark and the
 * "SIMPLIFY COMPLIANCE. AMPLIFY CARE." tagline). Three variants:
 *  - "header" → full lockup at the size used in the top nav
 *  - "footer" → larger lockup used in the footer
 *  - "mark"   → just the P-icon, no wordmark
 */
export function Logo({ variant = "header", className = "" }: Props) {
  if (variant === "mark") {
    return (
      <img
        src="/images/logo-mark.png"
        alt="Providocs"
        className={`h-9 w-9 ${className}`}
      />
    );
  }
  if (variant === "footer") {
    return (
      <img
        src="/images/logo-lockup-large.png"
        alt="Providocs — Simplify compliance. Amplify care."
        className={`h-10 w-auto ${className}`}
      />
    );
  }
  return (
    <img
      src="/images/logo-lockup.png"
      alt="Providocs — Simplify compliance. Amplify care."
      className={`h-7 w-auto ${className}`}
    />
  );
}

/**
 * Just the P-icon, used inside white circles (e.g. the Get Grandfathered In
 * section and the dashboard sidebar).
 */
export function LogoMark({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/images/logo-mark.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
