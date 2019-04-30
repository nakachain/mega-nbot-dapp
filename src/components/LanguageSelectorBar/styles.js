export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing.unit,
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
