/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0A0A0A',
        surfaceHover: '#141414',
        border: '#1F1F1F',
        borderHover: '#2A2A2A',
        textMain: '#EDEDED',
        textMuted: '#A1A1AA',
        primary: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          900: '#14532d',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        }
      }
    },
  },
  plugins: [],
}
