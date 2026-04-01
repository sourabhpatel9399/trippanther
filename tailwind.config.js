/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'serif': ['Fraunces', 'serif'],
        'body': ['Outfit', 'sans-serif'],
      },
      // tailwind.config.js
colors: {
  primary: '#1E3A8A',      // Deep Blue - same
  primaryLight: '#3B82F6', // Bright Blue - same
  primaryDark: '#1E2A5E',  // Dark Blue - same
  accent: '#D4AF37',       // ✅ Gold (Orange hata diya)
  accentLight: '#E8C84A',  // ✅ Gold hover state (naya add kiya)
  lightBg: '#F8FAFC',      // same
  darkText: '#1E293B',     // same
  grayText: '#64748B',     // same
},
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
         marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollLine: {
          '0%,100%': { opacity: '0.3', transform: 'scaleY(0.5)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
