export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#222052',
        secondary: '#D2B68A',
        dark: '#000000',
        light: '#B7B7B7',
        accent: '#3EE5D3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}