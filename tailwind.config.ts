import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Wanted Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
