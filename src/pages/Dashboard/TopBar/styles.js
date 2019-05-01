export default theme => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    padding: `${theme.spacing.unit}px ${theme.spacing.two}px`,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  logo: {
    height: 40,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      height: 35,
    },
    [theme.breakpoints.down('xs')]: {
      height: 28,
    },
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoContainer: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      marginTop: theme.spacing.two,
    },
  },
  networkSelect: {
    color: theme.palette.secondary.main,
  },
  networkSelectIcon: {
    fill: theme.palette.secondary.main,
  },
})
