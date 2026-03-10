import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/types/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        border: "hsl(240 5% 24%)",
        input: "hsl(240 4% 18%)",
        ring: "hsl(184 90% 56%)",
        background: "hsl(225 15% 7%)",
        foreground: "hsl(210 40% 96%)",
        primary: {
          DEFAULT: "hsl(184 90% 56%)",
          foreground: "hsl(222 47% 11%)"
        },
        secondary: {
          DEFAULT: "hsl(222 22% 16%)",
          foreground: "hsl(210 40% 96%)"
        },
        muted: {
          DEFAULT: "hsl(222 18% 14%)",
          foreground: "hsl(215 20% 72%)"
        },
        accent: {
          DEFAULT: "hsl(28 95% 61%)",
          foreground: "hsl(222 47% 11%)"
        },
        card: {
          DEFAULT: "hsl(226 19% 9%)",
          foreground: "hsl(210 40% 96%)"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(69, 226, 255, 0.12), 0 20px 60px rgba(4, 220, 255, 0.18)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(69,226,255,0.2), transparent 26%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Avenir Next"', '"Segoe UI"', "sans-serif"],
        display: ['"Clash Display"', '"Space Grotesk"', '"Avenir Next"', "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
