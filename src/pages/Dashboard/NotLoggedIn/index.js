import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import { getNakaWalletChromeLink } from '../../../utils/links'

const NotLoggedIn = ({ classes }) => (
  <div className={classes.root}>
    <SentimentVeryDissatisfied className={classes.icon} />
    <Typography variant="h6">
      <FormattedMessage id="notDetected" />
    </Typography>
    <Typography variant="h6" className={classes.loggedInText}>
      <FormattedMessage id="loggedInAndRefresh" />
    </Typography>
    <a href={getNakaWalletChromeLink()} target="blank">
      <FormattedMessage id="downloadExtension" />
    </a>
  </div>
)

NotLoggedIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotLoggedIn)
