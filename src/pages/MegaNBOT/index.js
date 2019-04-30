import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, Link, withStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import Heading from './Heading'
import Content from './Content'
import NoWalletDialog from '../../components/NoWalletDialog'
import WrongNetworkDialog from '../../components/WrongNetworkDialog'
import Constants from '../../constants'
import { getExplorerAddressLink } from '../../utils/links'

const { ADDRESS } = Constants
const TYPE_NORMAL = 'normal'
const TYPE_ADDRESS = 'address'

@withStyles(styles)
@inject('store')
@observer
class MegaNBOT extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  renderReward = () => {
    const { classes, store: { megaNBOTStore: { winningAmount } } } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Heading
          title={<FormattedMessage id="drawingReward" />}
          classes={classes} />
        <Content
          type={TYPE_NORMAL}
          text={<span>{winningAmount}</span>}
          classes={classes} />
      </div>
    )
  }

  renderBlocksLeft = () => {
    const {
      classes,
      store: {
        megaNBOTStore: {
          blocksLeft,
          timeLeft,
        },
      },
    } = this.props

    return (
      <div className={classes.sectionContainer}>
        <Heading
          title={<FormattedMessage id="approxTimeLeft" />}
          classes={classes} />
        <Content
          type="normal"
          text={<span>{timeLeft}</span>}
          subText={<FormattedMessage id="blocksLeft" values={{ blocksLeft }} />}
          classes={classes} />
      </div>
    )
  }

  getWinnerTypeAndText = (address) => {
    const { store: { walletStore: { account } } } = this.props
    if (!address && !account) return { type: 'normal', text: <span /> }

    let type
    let text
    if (address === ADDRESS.INVALID) {
      type = TYPE_NORMAL
      text = <FormattedMessage id="none" />
    } else if (account === address) {
      type = TYPE_NORMAL
      text = <FormattedMessage id="you" />
    } else {
      type = TYPE_ADDRESS
      text = <span>{address}</span>
    }
    return { type, text }
  }

  renderCurrentWinner = () => {
    const {
      classes,
      store: {
        walletStore: {
          network,
        },
        megaNBOTStore: {
          currentTempWinner,
        },
      },
    } = this.props
    const { type, text } = this.getWinnerTypeAndText(currentTempWinner)

    return (
      <div className={classes.sectionContainer}>
        <Heading
          title={<FormattedMessage id="currentWinner" />}
          classes={classes} />
        {currentTempWinner === ADDRESS.INVALID
          ? <Content type={type} text={text} classes={classes} />
          : (
            <Link
              href={getExplorerAddressLink(network, currentTempWinner)}
              target="_blank"
              rel="noopener"
            >
              <Content type={type} text={text} classes={classes} />
            </Link>
          )}
      </div>
    )
  }

  renderLastWinner = () => {
    const {
      classes,
      store: {
        walletStore: {
          network,
        },
        megaNBOTStore: {
          previousWinner,
        },
      },
    } = this.props
    const { type, text } = this.getWinnerTypeAndText(previousWinner)

    return (
      <div className={classes.sectionContainer}>
        <Heading
          title={<FormattedMessage id="yesterdaysFinalWinner" />}
          classes={classes} />
        {previousWinner === ADDRESS.INVALID
          ? <Content type={type} text={text} classes={classes} />
          : (
            <Link
              href={getExplorerAddressLink(network, previousWinner)}
              target="_blank"
              rel="noopener"
            >
              <Content type={type} text={text} classes={classes} />
            </Link>
          )}
      </div>
    )
  }

  onEntryButtonClick = () => {
    const {
      store: {
        walletStore: {
          account,
          network,
        },
        chainStore: {
          selectedNetwork,
        },
        megaNBOTStore: {
          enterDrawing,
          showNoWalletDialog,
          showWrongNetworkDialog,
        },
      },
    } = this.props

    if (account && network) {
      if (network !== selectedNetwork) showWrongNetworkDialog()
      else enterDrawing()
    } else {
      showNoWalletDialog()
    }
  }

  renderEntryButton = () => {
    const {
      classes,
      store: {
        megaNBOTStore: {
          blocksLeft,
          drawButtonDisabled,
        },
      },
    } = this.props

    return (
      <div className={classes.entrySection}>
        <Button
          variant="contained"
          color="primary"
          className={classes.enterButton}
          disabled={drawButtonDisabled}
          onClick={this.onEntryButtonClick}
        >
          {Number(blocksLeft) === 0
            ? <FormattedMessage id="drawWinner" />
            : <FormattedMessage id="enterDrawing" />}
        </Button>
      </div>
    )
  }

  renderNotice = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Typography variant="h5">
          <FormattedMessage id="freeDrawingsEveryDay" />
        </Typography>
        <Typography variant="h5">
          <FormattedMessage id="enterToWinNBOT" />
        </Typography>
        <Typography variant="h5">
          <FormattedMessage id="unlimitedEntries" />
        </Typography>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.renderReward()}
        {this.renderBlocksLeft()}
        {this.renderCurrentWinner()}
        {this.renderLastWinner()}
        {this.renderEntryButton()}
        {this.renderNotice()}
        <NoWalletDialog />
        <WrongNetworkDialog />
      </div>
    )
  }
}

export default MegaNBOT
