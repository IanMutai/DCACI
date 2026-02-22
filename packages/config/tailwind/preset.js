// ============================================================================
// Shared Tailwind CSS Preset for NCTP
// ============================================================================

/** @type {import("tailwindcss").Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        nctp: {
          // Primary - African Union Gold
          primary: {
            DEFAULT: "#D4A843",
            light: "#E5C576",
            dark: "#B8912E",
            50: "#FBF6E8",
            100: "#F5EAC8",
            200: "#EDD89F",
            300: "#E5C576",
            400: "#D4A843",
            500: "#B8912E",
            600: "#9A7824",
            700: "#7C5F1C",
            800: "#5E4715",
            900: "#40300E",
          },
          // Secondary - Forest Green (environment/climate)
          secondary: {
            DEFAULT: "#2D6A4F",
            light: "#52B788",
            dark: "#1B4332",
            50: "#E8F5EE",
            100: "#C7E6D5",
            200: "#95D5B2",
            300: "#74C69D",
            400: "#52B788",
            500: "#40916C",
            600: "#2D6A4F",
            700: "#1B4332",
            800: "#143326",
            900: "#0D221A",
          },
          // Accent - Sky Blue (transparency/data)
          accent: {
            DEFAULT: "#2196F3",
            light: "#64B5F6",
            dark: "#1565C0",
          },
          // Status colors
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        nctp: "0.5rem",
      },
      boxShadow: {
        nctp: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        "nctp-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        sidebar: "16rem",
        "sidebar-collapsed": "4rem",
      },
    },
  },
  plugins: [],
};
