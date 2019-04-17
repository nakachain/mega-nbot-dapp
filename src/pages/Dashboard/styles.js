export default theme => ({
  root: {
    width: '100%',
    minWidth: 700,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    overflowX: 'hidden',
  },
  paper: {
    margin: theme.spacing.two,
  },
})
