export default theme => ({
  root: {
    marginBottom: theme.spacing.two,
    padding: theme.spacing.two,
    background: '#E5E7E9',
    borderRadius: 4,
    '&.onlyOwner': {
      background: '#A6D9F7',
    },
  },
  infoContainer: {
    marginBottom: theme.spacing.two,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: theme.spacing.three,
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textField: {
    width: 200,
    marginRight: theme.spacing.two,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    height: 32,
  },
  errorText: {
    color: 'red',
  },
})
