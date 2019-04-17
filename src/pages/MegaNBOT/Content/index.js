import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const Content = ({ classes, type, text, subText }) => (
  <div className={classes.contentContainer}>
    <Typography
      variant={type === 'normal' ? 'h2' : 'h5'}
      color="primary"
    >
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
  type: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  subText: PropTypes.object,
}

export default Content
