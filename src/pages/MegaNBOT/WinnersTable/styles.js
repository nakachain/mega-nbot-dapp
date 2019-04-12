export default theme => ({
  table: {
    width: 600,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
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
