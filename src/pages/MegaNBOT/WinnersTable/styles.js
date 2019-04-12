export default theme => ({
  winnersTableContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    width: 600,
  },
  tableHeadText: {
    color: theme.palette.secondary.main,
  },
  tableBodyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
})
