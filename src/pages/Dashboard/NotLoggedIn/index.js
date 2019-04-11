import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import styles from './styles'
import { getNakaWalletChromeLink } from '../../../utils/links'

const NotLoggedIn = ({ classes }) => (
  <div className={classes.root}>
    <SentimentVeryDissatisfied className={classes.icon} />
    <Typography variant="h6">
      Naka Wallet was not detected.
    </Typography>
    <Typography variant="h6" className={classes.loggedInText}>
      Please make sure you are logged in and refresh the page.
    </Typography>
    <a href={getNakaWalletChromeLink()} target="blank">
      Download Naka Wallet Chrome Extension
    </a>
  </div>
)

NotLoggedIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotLoggedIn)
