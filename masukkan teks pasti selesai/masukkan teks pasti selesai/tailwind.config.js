/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        // Animasi yang sudah ada
        shimmer: "shimmer 2s linear infinite",
        // Animasi baru untuk galeri geser
        'scroll-x': 'scroll-x 40s linear infinite',
      },
      keyframes: {
        // Keyframes yang sudah ada
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Keyframes baru untuk galeri geser
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};