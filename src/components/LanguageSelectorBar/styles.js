export default theme => ({
  root: {
    display: 'inline',
    flexDirection: 'row',
    paddingTop: theme.spacing.two,
  },
  langItem: {
    marginRight: theme.spacing.two,
    display: 'inline',
    cursor: 'pointer',
    '&.selected': {
      color: theme.palette.primary.main,
      cursor: 'default',
    },
  },
  languageSelect: {
    color: theme.palette.secondary.main,
  },
  languageSelectIcon: {
    fill: theme.palette.secondary.main,
  },
})
