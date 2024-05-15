/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: {
          A100: "#F7F7FA",
          A200: "#DDE5FF",
          A300: "#809CFF",
          A400: "#1A46cd",
          DEFAULT: "#1A46cd",
        },
        success: {
          A200: "#DDFFE3",
          A400: "#20862B",
          DEFAULT: "#20862B",
        },
        error: {
          A200: "#FFDDDD",
          A400: "#C50000",
          DEFAULT: "#C50000",
        },
        secondary: {
          A200: "#EFEFEF",
          A400: "#242424",
          DEFAULT: "#242424",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        f1: ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        trhap: {
          primary: "#1A46cd",
          secondary: "#242424",
          accent: "#DDE5FF",
          neutral: "#EFEFEF",
          "base-100": "#F7F7FA",
          info: "#4f46e5",
          success: "#20862B",
          warning: "#facc15",
          error: "#C50000",
        },
      },
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: true,
  },
};
