/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      perspective: {
        '1000': 'perspective(1000px)',
      },

      colors: {
        primary: {
          dark: '#0A1828',
          light: '#E6F0FF',
          
        },
        accent: '#FF4500',
        highlight: '#007AFF',
        faster: '#b125d2', // From your fastest lap color
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}