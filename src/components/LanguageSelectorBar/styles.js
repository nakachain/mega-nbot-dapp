export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing.two,
  },
  langItem: {
    marginRight: theme.spacing.two,
    cursor: 'pointer',
    '&.selected': {
      color: theme.palette.primary.main,
      cursor: 'default',
    },
  },
})
