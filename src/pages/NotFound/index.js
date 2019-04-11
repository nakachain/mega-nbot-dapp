import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { MoodBad } from '@material-ui/icons'
import styles from './styles'

const NotFound = ({ classes }) => (
  <div className={classes.root}>
    <MoodBad className={classes.icon} />
    <Typography variant="h6">
      Page not found.
    </Typography>
  </div>
)

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotFound)
