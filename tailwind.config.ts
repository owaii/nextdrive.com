import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        phone: '360px',  
        tablet: '768px',
        fhd: '1920px',  
        wqhd: '2560px',
      }
    },
  },
  plugins: [],
};

export default config;