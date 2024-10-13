import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        mountainsDesktop: 'url(../public/images/background-desktop.jpg)',
        mountainsMobile: 'url(../public/images/background-mobile.jpg)',
      },
      colors: {
        primary: '#263238',
        accent: {
          dark: '#795548',
          light: '#996B5B',
          veryLight: '#d2bab0',
        },
        light: '#78909C',
        bluegray: '#546E7A',
      },
    },
  },
  plugins: [],
};
export default config;
