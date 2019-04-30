import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Dialog, Typography, withStyles } from '@material-ui/core'
import { SentimentDissatisfied } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import styles from './styles'

@withStyles(styles)
@inject('store')
@observer
class WrongNetworkDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  render() {
    const {
      classes,
      store: {
        megaNBOTStore: {
          wrongNetworkDialogVisible,
          hideWrongNetworkDialog,
        },
        chainStore: {
          selectedNetwork,
        },
      },
    } = this.props

    return (
      <Dialog
        open={wrongNetworkDialogVisible}
        onClose={hideWrongNetworkDialog}
      >
        <div className={classes.root}>
          <SentimentDissatisfied className={classes.icon} />
          <Typography variant="h6">
            <FormattedMessage
              id="wrongNetworkDetected"
              defaultMessage="Wrong network detected." />
          </Typography>
          <Typography variant="h6" className={classes.loggedInText}>
            <FormattedMessage
              id="changeWalletNetworkToX"
              defaultMessage="Change your wallet network to {network}."
              values={{ network: selectedNetwork }} />
          </Typography>
        </div>
      </Dialog>
    )
  }
}

export default WrongNetworkDialog
