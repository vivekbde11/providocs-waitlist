import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens lifted directly from Figma variables
        primary: {
          DEFAULT: "#0099a8",
          200: "#00c2d5",
          500: "#005954",
          600: "#002a2f",
          700: "#001417",
        },
        tertiary: {
          100: "#d2f7ff",
        },
        ink: {
          900: "#101111",
          700: "#242526",
          500: "#434545",
          400: "#646768",
          300: "#878b8c",
          100: "#d3d8da",
        },
        line: "#e4e4e7",
        success: "#34c759",
        danger: "#ff3b30",
        warning: "#ff9500",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        tighter2: "-0.056em",
        tighter3: "-0.07em",
      },
      borderRadius: {
        pill: "999px",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(96deg, #00c2d5 0%, #0099a8 60%, #005954 100%)",
        "soft-grid":
          "linear-gradient(180deg, #f7fefe 0%, #ecfafa 60%, #ffffff 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 17, 17, 0.04), 0 8px 24px rgba(16, 17, 17, 0.04)",
        cta: "0 8px 24px rgba(0, 153, 168, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
