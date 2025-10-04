/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        primary: "var(--color-primary)",
        muted: "var(--color-muted)",
        card: "var(--color-card)",
        border: "var(--color-border)",
      },
      borderRadius: {
        md: "var(--radius-md)",
      },
    },
  },
  plugins: [],
}
