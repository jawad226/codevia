/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app folder ke andar jitni bhi js/ts/tsx files hain
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          50: '#e0e7ff',
          100: '#c7d2fe',
          200: '#a5b4fc',
          300: '#818cf8',
          400: '#6366f1',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3', // Ye aapka dark blue
          800: '#312e81',
          900: '#1e1b4b',
          900: '#000000ff',
          900: '#363333ff',
        },
      },
    },
  },
  plugins: [],
}
