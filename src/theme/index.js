import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
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
    fontFamily: 'Lato, sans-serif',
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

theme.overrides = {
  ...theme.overrides,
  MuiTypography: {
    h2: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 45,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 30,
      },
    },
    h4: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 26,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
    h5: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}

export default theme
