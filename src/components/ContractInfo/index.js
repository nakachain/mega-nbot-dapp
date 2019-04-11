import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import styles from './styles'

const ContractInfo = ({ classes, name, owner }) => (
  <div className={classes.root}>
    <Typography variant="h5">
      {name} Contract
    </Typography>
    {owner && (
      <Typography variant="subtitle1">
        Owner: {owner}
      </Typography>
    )}
  </div>
)

ContractInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.string,
}

export default withStyles(styles)(ContractInfo)
