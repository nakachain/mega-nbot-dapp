import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const Content = ({ classes, text, subText }) => (
  <div className={classes.contentContainer}>
    <Typography variant="h2" color="primary">
      {text}
    </Typography>
    {subText && (
      <Typography variant="subtitle2" color="primary">
        {subText}
      </Typography>
    )}
  </div>
)

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  subText: PropTypes.string,
}

export default Content
