import { createMuiTheme } from '@material-ui/core/styles'

const MaterialUiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#282828',
    },
  },
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: '#FFF',
        '&:hover': {
          backgroundColor: '#FFF',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: '#FFF',
          },
        },
        '&.Mui-focused': {
          backgroundColor: '#FFF',
        },
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: 'F4DCF4',
        },
      },
    },
  },
})

export default MaterialUiTheme
