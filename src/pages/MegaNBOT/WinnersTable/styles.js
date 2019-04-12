export default theme => ({
  table: {
    width: 600,
  },
  tableHead: {
    backgroundColor: '#48A9A6',
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
