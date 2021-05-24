module.exports = {
  purge: {
    content: [
      '../cms/templates/**/*.{twig,html}',
    ],
    layers: [
      'base',
      'components',
      'utilities',
    ],
    mode: 'layers',
    options: {
      whitelist: [
        '../src/css/components/**/*.{css}',
      ],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Como']
    },
    extend: {
      keyframes: {
        fade: {
          'from': { opacity: 0 },
          'to': { opactiy: 1 }
        }
      },
      animation: {
        fade: 'fade 1s ease-in'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
