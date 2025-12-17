import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '480px',
        'fhd' : '1920px',
      }
    },
  },
  plugins: [],
};
export default config;