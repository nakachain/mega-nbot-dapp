import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, Link, Divider, withStyles } from '@material-ui/core'
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl'
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

const messages = defineMessages({
  hourSymbol: {
    id: 'MegaNBOT.hourSymbol',
    defaultMessage: 'h',
  },
  minuteSymbol: {
    id: 'MegaNBOT.minuteSymbol',
    defaultMessage: 'm',
  },
  secondSymbol: {
    id: 'MegaNBOT.secondSymbol',
    defaultMessage: 's',
  },
})

@withStyles(styles)
@injectIntl
@inject('store')
@observer
class MegaNBOT extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
    intl: intlShape.isRequired,
  }

  renderReward = () => {
    const { classes, store: { megaNbotStore: { winningAmount } } } = this.props
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
      intl,
      store: {
        megaNbotStore: {
          blocksLeft,
          timeLeft,
        },
      },
    } = this.props
    let translated = timeLeft

    // Translate hour, minute, second symbols
    if (translated) {
      if (translated.includes('h')) {
        const hour = intl.formatMessage({ id: messages.hourSymbol.id })
        translated = translated.replace('h', hour)
      }
      if (translated.includes('m')) {
        const min = intl.formatMessage({ id: messages.minuteSymbol.id })
        translated = translated.replace('m', min)
      }
      if (translated.includes('s')) {
        const sec = intl.formatMessage({ id: messages.secondSymbol.id })
        translated = translated.replace('s', sec)
      }
    }

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
          text={<span>{translated}</span>}
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

  renderNumOfPlayers = () => {
    const {
      classes,
      store: {
        megaNbotStore: {
          numOfEntries,
        },
      },
    } = this.props

    return (
      <div className={classes.sectionContainer}>
        <Heading
          title={
            <FormattedMessage
              id="numberOfEntries"
              defaultMessage="Number of Entries" />
          }
          classes={classes} />
        <Content
          type={TYPE_NORMAL}
          text={<span>{numOfEntries}</span>}
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
        megaNbotStore: {
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
        megaNbotStore: {
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
        megaNbotStore: {
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
        megaNbotStore: {
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
        {this.renderNumOfPlayers()}
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
