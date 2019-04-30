import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, Link, Divider, withStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import Heading from './Heading'
import Content from './Content'
import NoWalletDialog from '../../components/NoWalletDialog'
import WrongNetworkDialog from '../../components/WrongNetworkDialog'
import LanguageSelectorBar from '../../components/LanguageSelectorBar'
import { ADDRESS } from '../../constants'
import { getExplorerAddressLink } from '../../utils/links'

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
          title={
            <FormattedMessage
              id="drawingReward"
              defaultMessage="Drawing Reward" />
          }
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
          title={(
            <FormattedMessage
              id="approxTimeLeft"
              defaultMessage="Approx. Time Left" />
          )}
          classes={classes} />
        <Content
          type="normal"
          text={<span>{timeLeft}</span>}
          subText={
            <FormattedMessage
              id="blocksLeft"
              defaultMessage="Blocks Left: {blocksLeft}"
              values={{ blocksLeft }} />
          }
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
      text = <FormattedMessage id="none" defaultMessage="None" />
    } else if (account === address) {
      type = TYPE_NORMAL
      text = <FormattedMessage id="you" defaultMessage="You" />
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
          title={
            <FormattedMessage
              id="currentWinner"
              defaultMessage="Current Winner" />
          }
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
          title={
            <FormattedMessage
              id="yesterdaysFinalWinner"
              defaultMessage="Yesterday's Final Winner" />
          }
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
            ? <FormattedMessage id="drawWinner" defaultMessage="Draw Winner" />
            : <FormattedMessage id="enterDrawing" defaultMessage="Enter Drawing"/>
          }
        </Button>
      </div>
    )
  }

  renderNotice = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Typography variant="h5">
          <FormattedMessage
            id="freeDrawingsEveryDay"
            defaultMessage="FREE drawings every day!" />
        </Typography>
        <Typography variant="h5">
          <FormattedMessage
            id="enterToWinNBOT"
            defaultMessage="Enter to win NBOT!" />
        </Typography>
        <Typography variant="h5">
          <FormattedMessage
            id="unlimitedEntries"
            defaultMessage="Unlimited entries!" />
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
        <Divider className={classes.divider} />
        <LanguageSelectorBar />
        <NoWalletDialog />
        <WrongNetworkDialog />
      </div>
    )
  }
}

export default MegaNBOT
