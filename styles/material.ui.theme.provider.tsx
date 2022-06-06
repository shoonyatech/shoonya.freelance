import { createTheme } from '@mui/material/styles'

const MaterialUiTheme = createTheme({
  palette: {
    primary: {
      main: '#282828',
    },
    secondary: {
      main: '#e8d4b2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            color: '#e8d4b2',
          }),
        }),
      },
    },
  },
})

export default MaterialUiTheme
