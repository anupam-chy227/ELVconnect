export const tokens = {
  colors: {
    primary: "var(--primary)",
    primarySoft: "var(--primary-container)",
    primarySubtle: "var(--primary-subtle)",
    secondary: "var(--secondary)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    surface: "var(--surface)",
    surfaceRaised: "var(--surface-raised)",
    surfaceMuted: "var(--surface-muted)",
    border: "var(--border)",
    text: "var(--foreground)",
    muted: "var(--muted-foreground)",
  },
  radius: {
    xs: "var(--radius-xs)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
  },
  shadow: {
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    focus: "var(--shadow-focus)",
  },
} as const;

export type Tokens = typeof tokens;
