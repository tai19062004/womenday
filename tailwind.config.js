/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          pastel: '#FFD6E7',
          soft: '#FFB6D5',
          rose: '#F48FB1',
          cream: '#FFF8FC',
          lavender: '#E8DDFE',
          accent: '#E75480',
          darkRose: '#C2185B',
        }
      },
      fontFamily: {
        cute: ['"Quicksand"', '"Nunito"', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        serifCute: ['"Playfair Display"', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(244, 143, 177, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 28px rgba(231, 84, 128, 0.85))' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        shake: 'shake 0.4s ease-in-out',
      }
    },
  },
  plugins: [],
};

