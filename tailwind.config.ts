import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))", // Cyan/Teal
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Deep Indigo
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Electric Magenta/Purple
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "gray-400": "#9ca3af", // For inactive icons
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "aurora-pulse": {
          "0%, 100%": { opacity: "0.7", boxShadow: "0 0 10px hsl(var(--primary) / 0.5)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.5)" },
        },
        "subtle-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 2px hsl(var(--primary) / 0.3))" },
          "50%": { filter: "drop-shadow(0 0 5px hsl(var(--primary) / 0.5))" },
        },
        "aurora-sidebar-bg": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "aurora-pulse": "aurora-pulse 3s infinite ease-in-out",
        "subtle-glow": "subtle-glow 2.5s infinite ease-in-out",
        "aurora-sidebar-bg": "aurora-sidebar-bg 20s ease infinite",
      },
      boxShadow: {
        "primary-glow-sm": "0 0 8px 2px hsl(var(--primary) / 0.3)",
        "primary-glow-md": "0 0 15px 5px hsl(var(--primary) / 0.25)",
        "primary-glow-lg": "0 0 25px 8px hsl(var(--primary) / 0.2)",
        "accent-glow-md": "0 0 15px 5px hsl(var(--accent) / 0.25)",
        // For active nav item: shadow-lg + color
        "nav-active":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1), 0 0 12px 0px hsl(var(--primary) / 0.25)",
        // For hover nav item: shadow-md + color
        "nav-hover":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 8px 0px hsl(var(--primary) / 0.15)",
      },
      backgroundSize: {
        "aurora-bg-size": "400% 400%",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add scrollbar plugin
    ({ addUtilities }: any) => {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
        },
        ".scrollbar-track-transparent": {
          scrollbarColor: "transparent transparent",
        },
        ".scrollbar-thumb-cyan-500\\/20": {
          scrollbarColor: "rgb(6 182 212 / 0.2) transparent",
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
export default config
