import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Dialog, Typography, Grid, withStyles } from '@material-ui/core'
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import { getWalletAppStoreLink, getWalletPlayStoreLink, getWalletChromeLink } from '../../utils/links'
import AppStoreBadge from '../../../static/images/app_store_badge.png'
import GooglePlayBadge from '../../../static/images/google_play_badge.png'
import ChromeWebStoreBadge from '../../../static/images/chrome_web_store_badge.png'

@withStyles(styles)
@inject('store')
@observer
class NoWalletDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  renderBadge = (badge, url) => {
    const { classes } = this.props
    return (
      <Grid item xs={12} sm={4} align="center">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={badge} className={classes.badgeImg} />
        </a>
      </Grid>
    )
  }

  render() {
    const {
      classes,
      store: {
        megaNbotStore: { noWalletDialogVisible, hideNoWalletDialog },
      },
    } = this.props

    return (
      <Dialog
        open={noWalletDialogVisible}
        onClose={hideNoWalletDialog}
      >
        <div className={classes.root}>
          <SentimentVeryDissatisfied className={classes.icon} />
          <Typography variant="h6">
            <FormattedMessage
              id="notDetected"
              defaultMessage="Naka Wallet was not detected."/>
          </Typography>
          <Typography variant="h6" className={classes.loggedInText}>
            <FormattedMessage
              id="loggedInAndRefresh"
              defaultMessage="Please make sure you are logged in and refresh the page." />
          </Typography>

          <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            {this.renderBadge(AppStoreBadge, getWalletAppStoreLink())}
            {this.renderBadge(GooglePlayBadge, getWalletPlayStoreLink())}
            {this.renderBadge(ChromeWebStoreBadge, getWalletChromeLink())}
          </Grid>
        </div>
      </Dialog>
    )
  }
}

export default NoWalletDialog
