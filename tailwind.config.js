/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },

        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },

        dark: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#0a0618", // Main dark bg (purple-tinted)
          950: "#050310", // Darker variant
        },

        surface: {
          light: "#1f1238", // rgba(31, 18, 66, 1)
          DEFAULT: "#150c2e", // rgba(21, 12, 46, 1)
          dark: "#0f0820", // rgba(15, 8, 32, 1)
          card: "#2d1b56", // rgba(45, 27, 86, 1)
        },

        text: {
          primary: "#ffffff",
          secondary: "#cbd5e1",
          muted: "#94a3b8",
        },

        accent: {
          purple: "#7c3aed",
          "purple-light": "#9d6cff",
          "purple-dark": "#6d28d9",
        },

        success: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },

        danger: {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-dark": "linear-gradient(135deg, #0a0618 0%, #1f1238 100%)",
        "gradient-purple": "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(45, 27, 78, 0.7), rgba(31, 20, 56, 0.7))",
        "gradient-surface":
          "linear-gradient(135deg, rgba(31, 18, 66, 0.6), rgba(21, 12, 46, 0.6))",
      },
      boxShadow: {
        "glow-purple": "0 0 20px rgba(124, 58, 237, 0.3)",
        "glow-purple-lg": "0 0 40px rgba(124, 58, 237, 0.4)",
        card: "0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        "card-hover":
          "0 12px 32px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%) translateY(-100%) rotate(45deg)",
          },
          "100%": {
            transform: "translateX(100%) translateY(100%) rotate(45deg)",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "scroll-left": "scroll-left 30s linear infinite",
        shimmer: "shimmer 3s infinite",
        "gradient-shift": "gradient-shift 5s ease infinite",
        pulse: "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};
