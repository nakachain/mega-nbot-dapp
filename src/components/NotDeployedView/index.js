import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

const NotDeployedView = ({ name }) => (
  <div>
    <Typography variant="h5">
      <FormattedMessage id="xNotDeployedYet" values={{ name }} />
    </Typography>
  </div>
)

NotDeployedView.propTypes = {
  name: PropTypes.string.isRequired,
}

export default NotDeployedView
