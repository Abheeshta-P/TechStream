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
      screens: {

        'sm': '538px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}