/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:      '#1e40af',
        'bw-blue':    '#0000AB',
        'bw-sky':     '#0084FF',
        'bw-red':     '#FE3866',
        'bw-green':   '#56E5B2',
        'bw-night':   '#000074',
        'bw-granite': '#282828',
        'bw-steel':   '#515151',
        'bw-clay':    '#A1968A',
        'bw-sand':    '#EEECED',
        'bw-white':   '#FFFFFF',
        'bw-black':   '#000000',
      },
      fontFamily: {
        proxima: ['"Proxima Nova"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
