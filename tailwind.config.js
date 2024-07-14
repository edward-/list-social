/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-color-100': '#293254',
        'primary-color-90': '#3e4665',
        'primary-color-80': '#535a76',
        'primary-color-70': '#696f87',
        'primary-color-60': '#7e8498',
        'primary-color-50': '#9498a9',
        'primary-color-40': '#a9adba',
        'primary-color-30': '#bec1cb',
        'primary-color-20': '#d4d6dc',
        'primary-color-10': '#e9eaed',
        'secondary-color-100': '#fbbf01',
        'secondary-color-90': '#fbc51a',
        'secondary-color-80': '#fbcb33',
        'secondary-color-70': '#fcd24d',
        'secondary-color-60': '#fcd866',
        'secondary-color-50': '#fddf80',
        'secondary-color-40': '#fde599',
        'secondary-color-30': '#fdebb2',
        'secondary-color-20': '#fef2cc',
        'secondary-color-10': '#fef8e5',
      },
    },
  },
  plugins: [],
};
