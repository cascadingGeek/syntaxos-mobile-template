/**
 * Tailwind 3 + NativeWind v4.
 *
 * Pinned deliberately: NativeWind v4 targets Tailwind 3, and the Tailwind 4
 * pairing only exists on NativeWind v5, which is still `5.0.0-preview.4`.
 * A canonical template that every generated app inherits is the wrong place
 * to run a preview toolchain.
 *
 * Colours are driven by CSS variables so the Design Taste Agent's approved
 * screen spec can rewrite one block (global.css) and restyle a whole app,
 * rather than rewriting every className in every generated screen.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [],
};
