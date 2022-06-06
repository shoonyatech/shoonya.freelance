module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'sprite-background': "url('/images/icons.png')",
      }),
      boxShadow: {
        fb: '0 -2px 5px rgb(128,128,128)',
        fbpanel: '0 1px 10px grey',
        img: '2px 3px 12px #d3d3d3',
      },
      // compiled the css with the below primary and secondary colors and linked with _app.tsx.
      colors: {
        resume: '#dfe5cb',
        skillbarfilled: '#A7BB80',
        skillbarempty: '#CADDA5',
        primary: '#282828',
        secondary: '#E8D4B2',
      },
      fontFamily: {
        sans: [
          'Didact Gothic',
          'Source Sans Pro',
          'sans-serif',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      flex: {
        2: '2',
      },
      gridTemplateColumns: {
        profile: '18rem 1fr',
        masterDetailsLayout: '36rem 1fr',
      },
      gridTemplateRows: {
        wizardFlow: '1fr auto',
        pancake: 'auto 1fr auto',
      },
      width: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '4/4': '100%',
      },
      minHeight: {
        10: '2.5rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
