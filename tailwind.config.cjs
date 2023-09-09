/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#222",
      white: "#fff",
      danger: "#f33950",
      information: "#35c4fc",
      success: "#75d00f",
      warning: "#ffb70a",
      "japandi-black": "#241f19",
      "japandi-blue": "#9eadb4",
      "japandi-brown-dark": "#523d35",
      "japandi-brown-light": "#bba58f",
      "japandi-gray-dark": "#5a5a5a",
      "japandi-gray-light": "#807f7a",
      "japandi-green-dark": "#223030",
      "japandi-green-light": "#a9b2a1",
      "japandi-nude": "#e7d9c9",
      "japandi-orange": "#d0864a",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["pastel", "night"],
  },
};
