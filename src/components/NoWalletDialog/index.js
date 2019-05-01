import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Dialog, Typography, withStyles } from '@material-ui/core'
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import { getNakaWalletChromeLink } from '../../utils/links'

@withStyles(styles)
@inject('store')
@observer
class NoWalletDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
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
          <a href={getNakaWalletChromeLink()} target="blank">
            <FormattedMessage
              id="downloadExtension"
              defaultMessage="Download Naka Wallet Chrome Extension" />
          </a>
        </div>
      </Dialog>
    )
  }
}

export default NoWalletDialog
