import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, withStyles } from '@material-ui/core'
import styles from './styles'
import Heading from './Heading'
import Content from './Content'
import NotDeployedView from '../../components/NotDeployedView'

@inject('store')
@observer
class MegaNBOT extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  renderRewardSection = () => {
    const { classes, store: { megaNBOTStore: { winningAmount } } } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Heading title="Drawing Reward" classes={classes} />
        <Content text={winningAmount} classes={classes} />
      </div>
    )
  }

  renderWinnerSection = () => {
    const {
      classes,
      store: {
        walletStore: {
          account,
        },
        megaNBOTStore: {
          lastWinner,
        },
      },
    } = this.props
    const address = lastWinner && lastWinner.address
    const text = account === address ? 'You' : address

    return (
      <div className={classes.sectionContainer}>
        <Heading title="Last Winner" classes={classes} />
        <Content text={text} classes={classes} />
      </div>
    )
  }

  renderBlocksSection = () => {
    const {
      classes,
      store: {
        chainStore: {
          blockNumber,
        },
        megaNBOTStore: {
          blocksLeft,
          timeLeft,
        },
      },
    } = this.props

    return (
      <div>
        <div className={classes.sectionContainer}>
          <Heading
            title="Blocks Left"
            classes={classes} />
          <Content
            text={blocksLeft}
            subText={`approx. ${timeLeft}`}
            classes={classes} />
        </div>
        <div className={classes.sectionContainer}>
          <Heading
            title="Current Block"
            classes={classes} />
          <Content
            text={blockNumber && blockNumber.toString()}
            classes={classes} />
        </div>
      </div>
    )
  }

  renderEntrySection = () => {
    const {
      classes,
      store: {
        megaNBOTStore: {
          blocksLeft,
          drawButtonDisabled,
          enterDrawing,
          inCurrentDrawing,
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
        {inCurrentDrawing && (
          <Typography variant="subtitle2" color="error">
            You are already in this drawing.
          </Typography>
        )}
      </div>
    )
  }

  renderNoticeSection = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Typography variant="h5">
          FREE drawings every day. Enter to win NBOT!
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
        {this.renderRewardSection()}
        {this.renderWinnerSection()}
        {this.renderBlocksSection()}
        {this.renderEntrySection()}
        {this.renderNoticeSection()}
      </div>
    )
  }
}

export default withStyles(styles)(MegaNBOT)
