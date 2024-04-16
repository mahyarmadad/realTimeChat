import type {Config} from "tailwindcss";

const {COLORS} = require("./src/constants/colors");

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  // important: true,
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: COLORS.background,
        paperBackground: COLORS.paperBackground,
        primary: COLORS.primary,
        text: COLORS.text,
        danger: COLORS.danger,
        success: COLORS.success,
        shade: COLORS.shade,
        done: COLORS.msgDone,
        dateText: COLORS.dateText,
      },
    },
  },
  plugins: [],
};
export default config;
