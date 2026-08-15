import type { Config } from "tailwindcss";

/**
 * Palette AgroMetha — mode clair dominant.
 *
 *   FONDS    canvas / canvas-alt / canvas-veil / surface
 *   ENCRE    ink / ink-soft / ink-mute / ink-faint
 *   VERT     forest (profond) · agro (signature) · agro-pale
 *   ACCENTS  volt (énergie, froid) · amber (matière organique, chaud)
 *   TRAITS   line / line-strong
 *
 * Le vert profond et le noir servent d'accents (titres, contours, graphismes),
 * jamais de fond dominant.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F7F8F4",
          alt: "#EEF2EA",
          veil: "#E4EDE2",
          deep: "#D8E5D6",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFBF8",
        },
        ink: {
          DEFAULT: "#0A0F0C",
          soft: "#37443C",
          mute: "#6E7D73",
          faint: "#98A69D",
        },
        forest: {
          DEFAULT: "#14372A",
          light: "#1E5038",
        },
        agro: {
          DEFAULT: "#4A7C4E",
          light: "#7BA97D",
          pale: "#CFE0CC",
        },
        volt: {
          DEFAULT: "#12BE85",
          deep: "#0A8C61",
          soft: "#5FE0B0",
          pale: "#C9F5E4",
        },
        amber: {
          DEFAULT: "#D89A3F",
          deep: "#9E6519",
          soft: "#EFC98D",
          pale: "#F6E8CD",
        },
        line: {
          DEFAULT: "#D7E0D4",
          strong: "#B4C4B2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.035em",
        wide: "0.18em",
      },
      maxWidth: {
        prose: "38rem",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 12px 40px -18px rgba(10,15,12,0.22)",
        lift: "0 18px 50px -24px rgba(20,55,42,0.35)",
        "glow-volt": "0 0 0 1px rgba(18,190,133,0.25), 0 0 34px -6px rgba(18,190,133,0.45)",
        "glow-amber": "0 0 0 1px rgba(216,154,63,0.25), 0 0 34px -6px rgba(216,154,63,0.45)",
      },
      backgroundImage: {
        "veil-radial":
          "radial-gradient(120% 80% at 50% 0%, #FFFFFF 0%, #F7F8F4 45%, #E4EDE2 100%)",
        "volt-sweep":
          "linear-gradient(100deg, #14372A 0%, #0A8C61 22%, #12BE85 38%, #7DF2C6 50%, #12BE85 62%, #0A8C61 78%, #14372A 100%)",
      },
      keyframes: {
        sweep: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
      },
      animation: {
        sweep: "sweep 6s linear infinite",
        breathe: "breathe 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
