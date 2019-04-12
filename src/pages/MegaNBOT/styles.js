export default theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.five,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing.seven,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  blocksContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingText: {
    marginBottom: theme.spacing.unit,
  },
  entrySection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing.four,
  },
  enterButton: {
    fontSize: 20,
    padding: `${theme.spacing.two}px ${theme.spacing.six}px`,
  },
})
