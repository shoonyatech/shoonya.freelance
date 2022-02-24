import { createMuiTheme } from '@material-ui/core/styles'

const MaterialUiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#282828',
    },
    secondary: {
      main: '#E8D4B2',
    },
  },
  overrides: {
    MuiButton: {
      label: {
        color: '#E8D4B2',
      },
    },
  },
})

export default MaterialUiTheme
