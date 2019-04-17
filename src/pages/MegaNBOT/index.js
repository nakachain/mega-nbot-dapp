import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, withStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import Heading from './Heading'
import Content from './Content'
import NotDeployedView from '../../components/NotDeployedView'
import Constants from '../../constants'

const { ADDRESS } = Constants
const TYPE_NORMAL = 'normal'
const TYPE_ADDRESS = 'address'

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

  getWinnerTypeAndText = (address) => {
    const { store: { walletStore: { account } } } = this.props
    if (!address && !account) return { type: 'normal', text: '' }

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
        <Content type={type} text={text} classes={classes} />
      </div>
    )
  }

  renderLastWinner = () => {
    const {
      classes,
      store: {
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
        <Content type={type} text={text} classes={classes} />
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
          title={<FormattedMessage id="blocksLeft" />}
          classes={classes} />
        <Content
          type="normal"
          text={<span>{blocksLeft}</span>}
          subText={<FormattedMessage id="approxTimeLeft" values={{ timeLeft }} />}
          classes={classes} />
      </div>
    )
  }

  renderEntryButton = () => {
    const {
      classes,
      store: {
        megaNBOTStore: {
          blocksLeft,
          drawButtonDisabled,
          enterDrawing,
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
          onClick={enterDrawing}
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
    const {
      classes,
      store: { megaNBOTStore: { deployed } },
    } = this.props

    // Show not deployed view
    // if (!deployed) {
    //   return <NotDeployedView name="MegaNBOT" />
    // }

    return (
      <div className={classes.root}>
        {this.renderReward()}
        {this.renderBlocksLeft()}
        {this.renderCurrentWinner()}
        {this.renderLastWinner()}
        {this.renderEntryButton()}
        {this.renderNotice()}
      </div>
    )
  }
}

export default withStyles(styles)(MegaNBOT)
