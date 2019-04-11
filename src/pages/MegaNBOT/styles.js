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
    marginBottom: theme.spacing.eight,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&.marginRight': {
      marginRight: theme.spacing.eight,
    },
  },
  blocksContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingText: {
    marginBottom: theme.spacing.unit,
  },
  enterButton: {
    fontSize: 20,
    padding: `${theme.spacing.two}px ${theme.spacing.six}px`,
  },
})
