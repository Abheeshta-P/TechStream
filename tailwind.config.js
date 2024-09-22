/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      topography : (theme) =>({
        DEFAULT : {
          css : {
            a : {
              textDecoration : 'none',
              color : theme('colors.blue.500'),
              fontWeight : '600',
              '&:hover' : {
                textDecoration : 'underline',
              },
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}