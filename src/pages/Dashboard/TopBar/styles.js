export default theme => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    height: 40,
    marginRight: theme.spacing.unit,
  },
  infoContainer: {
    textAlign: 'right',
  },
})
