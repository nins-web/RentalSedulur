/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#A78BFA",
        accent: "#25D366",
        "accent-alt": "#F43F5E",
        background: "#F8FAFC",
        foreground: "#0F172A",
        card: "#FFFFFF",
        muted: "#F1F5F9",
        "muted-foreground": "#64748B",
        border: "#E2E8F0",
        success: "#10B981",
        warning: "#F59E0B",
        destructive: "#EF4444",
      },
      fontFamily: {
        display: ["Russo One", "sans-serif"],
        heading: ["Chakra Petch", "sans-serif"],
        body: ["Chakra Petch", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: { card: "12px", modal: "16px" },
      boxShadow: { card: "0 4px 12px rgba(0,0,0,0.08)", "card-hover": "0 10px 24px rgba(0,0,0,0.12)" },
    },
  },
  plugins: [],
}
