/**
 * Design tokens. The Design Taste Agent's approved screen spec is the source
 * of these values for a generated app — the starter ships neutral defaults so
 * an untouched clone renders sanely.
 */

export const tokens = {
  color: {
    background: "#0B0B0F",
    surface: "#16161C",
    border: "#2C2C36",
    text: "#F5F5F7",
    textMuted: "#8A8A95",
    accent: "#4C8DFF",
    danger: "#D7263D",
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 6, md: 12, lg: 20 },
  fontSize: { sm: 13, md: 15, lg: 17, xl: 22 },
} as const;
