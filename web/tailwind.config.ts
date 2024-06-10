import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#5970c5",
        "secondary":"#3d52a0",
        "accent":"#8697c4",
        "default": "#171717"
      }
    },
  },
  plugins: [],
};
export default config;
