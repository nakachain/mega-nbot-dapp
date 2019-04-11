import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, withStyles } from '@material-ui/core'
import styles from './styles'
import NotDeployedView from '../../components/NotDeployedView'

const Heading = ({ classes, title }) => (
  <Typography variant="h5" className={classes.headingText}>
    {title}
  </Typography>
)
Heading.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

const Content = ({ classes, text, subText }) => (
  <div className={classes.contentContainer}>
    <Typography variant="h2" color="primary">
      {text}
    </Typography>
    {subText && (
      <Typography variant="subtitle2" color="primary">
        {subText}
      </Typography>
    )}
  </div>
)
Content.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  subText: PropTypes.string,
}

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
        <Heading title="Current Drawing Reward" classes={classes} />
        <Content text={winningAmount} classes={classes} />
      </div>
    )
  }

  renderBlocksLeftSection = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Heading
          title="Blocks Left"
          classes={classes} />
        <Content
          text="12345"
          subText="approximately 20 hours 15 minutes"
          classes={classes} />
      </div>
    )
  }

  renderEntrySection = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.enterButton}
        >
          Enter Drawing
        </Button>
      </div>
    )
  }

  renderNoticeSection = () => {
    const { classes } = this.props
    return (
      <div className={classes.sectionContainer}>
        <Typography variant="h3">
          New FREE drawings every day.
        </Typography>
        <Typography variant="h3">
          Enter to win NBOT!
        </Typography>
      </div>
    )
  }

  componentDidMount() {
    const {
      store: {
        walletStore: { network },
        megaNBOTStore: { initContracts },
      },
    } = this.props
    if (network) initContracts()
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
        {this.renderBlocksLeftSection()}
        {this.renderEntrySection()}
        {this.renderNoticeSection()}
      </div>
    )
  }
}

export default withStyles(styles)(MegaNBOT)
