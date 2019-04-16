import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, withStyles } from '@material-ui/core'
import styles from './styles'
import Heading from './Heading'
import Content from './Content'
import NotDeployedView from '../../components/NotDeployedView'
import Constants from '../../constants'

const { ADDRESS } = Constants

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
        <Heading title="Drawing Reward" classes={classes} />
        <Content type="normal" text={winningAmount} classes={classes} />
      </div>
    )
  }

  renderCurrentWinner = () => {
    const {
      classes,
      store: {
        walletStore: {
          account,
        },
        megaNBOTStore: {
          currentTempWinner,
        },
      },
    } = this.props

    let text
    if (currentTempWinner === ADDRESS.INVALID) text = 'None'
    else if (account === currentTempWinner) text = 'You'
    else text = currentTempWinner

    return (
      <div className={classes.sectionContainer}>
        <Heading title="Current Winner" classes={classes} />
        <Content type="address" text={text} classes={classes} />
      </div>
    )
  }

  renderLastWinner = () => {
    const {
      classes,
      store: {
        walletStore: {
          account,
        },
        megaNBOTStore: {
          previousWinner,
        },
      },
    } = this.props

    let text
    if (previousWinner === ADDRESS.INVALID) text = 'None'
    else if (account === previousWinner) text = 'You'
    else text = previousWinner

    return (
      <div className={classes.sectionContainer}>
        <Heading title="Last Winner" classes={classes} />
        <Content type="address" text={text} classes={classes} />
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
          title="Blocks Left"
          classes={classes} />
        <Content
          type="normal"
          text={blocksLeft}
          subText={`approx. ${timeLeft}`}
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
          {Number(blocksLeft) === 0 ? 'Draw Winner' : 'Enter Drawing'}
        </Button>
      </div>
    )
  }

  renderNotice = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Typography variant="h5">
          FREE drawings every day!
        </Typography>
        <Typography variant="h5">
          Enter to win NBOT!
        </Typography>
        <Typography variant="h5">
          Unlimited entries!
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
    if (!deployed) {
      return <NotDeployedView name="MegaNBOT" />
    }

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
