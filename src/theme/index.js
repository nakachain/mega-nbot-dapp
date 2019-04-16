import { createMuiTheme } from '@material-ui/core/styles'
import 'typeface-abel'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#5539df',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: 'Abel, Roboto, sans-serif',
    useNextVariants: true,
  },
  spacing: {
    unit: 8,
    two: 16,
    three: 24,
    four: 32,
    five: 40,
    six: 48,
    seven: 56,
    eight: 64,
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiTableHead: {
      root: {
        backgroundColor: '#48A9A6',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      },
    },
  },
})
