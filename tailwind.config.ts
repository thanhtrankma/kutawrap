import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kuta-primary": {
          teal: "#1a585c",
          orange: "#bd4c04",
        },
        "kuta-secondary": {
          teal: "#27a3ad",
          red: "#b62005",
          cyan: "#69cdd5",
          orange: "#f39b04",
        },
        "kuta-accent": {
          green: "#66bf5c",
          "neon-green": "#18e402",
          yellow: "#f3cd04",
          cream: "#ffefd3",
        },
        "kuta-text": "#ffdbbe",
      },
      fontFamily: {
        baloo: ["var(--font-baloo)", "sans-serif"],
        anton: ["var(--font-anton)", "sans-serif"],
        sans: ["var(--font-sans)", "DM Sans", "sans-serif"],
      },
      boxShadow: {
        "kuta-card": "6px 6px 0 0 rgba(0,0,0,0.25), 8px 8px 0 0 var(--kuta-primary-teal)",
        "kuta-card-hover":
          "8px 8px 0 0 rgba(0,0,0,0.3), 12px 12px 0 0 var(--kuta-primary-teal)",
      },
    },
  },
  plugins: [],
};

export default config;
