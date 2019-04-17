import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const Heading = ({ classes, title }) => (
  <Typography variant="h5" className={classes.headingText}>
    {title}
  </Typography>
)

Heading.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
}

export default Heading
