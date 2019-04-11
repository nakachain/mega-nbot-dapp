import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const NotDeployedView = ({ name }) => (
  <div>
    <Typography variant="h5">
      {name} has not been deployed yet.
    </Typography>
  </div>
)

NotDeployedView.propTypes = {
  name: PropTypes.string.isRequired,
}

export default NotDeployedView
