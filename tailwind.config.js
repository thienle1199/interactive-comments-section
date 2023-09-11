/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "heading-m": ["16px", { fontWeight: 500, lineHeight: "18.96px" }],
        "heading-l": ["24px", { fontWeight: 500, lineHeight: "28.44px" }],
        "body-bold": ["16px", { fontWeight: 500, lineHeight: "24px" }],
        body: ["16px", { fontWeight: 400, lineHeight: "24px" }],
      },
    },
    screens: {
      desktop: "730px",
    },
    colors: {
      // ### Primary
      "moderate-blue": "hsl(238, 40%, 52%)",
      "soft-ed": "hsl(358, 79%, 66%)",
      "light-grayish-blue": "hsl(239, 57%, 85%)",
      "pale-red": "hsl(357, 100%, 86%)",
      // ### Neutral
      "dark-blue": "hsl(212, 24%, 26%)",
      "grayish-blue": "hsl(211, 10%, 45%)",
      "light-gray": "hsl(223, 19%, 93%)",
      "very-light-gray": "hsl(228, 33%, 97%)",
      white: "hsl(0, 0%, 100%)",
      black: "hsl(0, 0%, 0%)",
    },
    fontFamily: {
      rubik: "Rubik, sans-serif",
    },
  },
  plugins: [],
};
