import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, Button, withStyles } from '@material-ui/core'
import styles from './styles'
import MegaNBOTMeta from '../../contracts/mega-nbot'
import NBOTMeta from '../../contracts/nbot'
import Constants from '../../constants'
import Config from '../../config'
import NotDeployedView from '../../components/NotDeployedView'

const { NETWORK } = Constants
const { TOKEN: { NBOT } } = Config

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
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
}

@inject('store')
@observer
class MegaNBOT extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      contract: undefined,
      nbotContract: undefined,
      owner: undefined,
    }
  }

  renderRewardSection = () => {
    const { classes } = this.props
    const { winningAmount } = this.state
    return (
      <div className={classes.sectionContainer}>
        <Heading title="Current Drawing Reward" classes={classes} />
        <Content text="100 NBOT" classes={classes} />
      </div>
    )
  }

  renderBlocksLeftSection = () => {
    const { classes } = this.props
    const { blocksLeft, estimatedTimeLeft } = this.state
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
        <Button variant="raised" color="primary" className={classes.enterButton}>
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
          New free drawings every day!
        </Typography>
        <Typography variant="h3">
          Enter to win NBOT!
        </Typography>
      </div>
    )
  }

  componentDidMount() {
    const { store: { walletStore: { network } } } = this.props
    if (network) {
      let contract = window.naka.eth.contract(MegaNBOTMeta.abi)
      let nbotContract = window.naka.eth.contract(NBOTMeta.abi)

      let addr
      let nbotAddr
      if (network === NETWORK.MAINNET) {
        addr = MegaNBOTMeta.mainnet
        nbotAddr = NBOTMeta.mainnet
      } else if (network === NETWORK.TESTNET) {
        addr = MegaNBOTMeta.testnet
        nbotAddr = NBOTMeta.testnet
      }

      if (addr && nbotAddr) {
        contract = contract.at(addr)
        nbotContract = nbotContract.at(nbotAddr)
        this.setState({ contract, nbotContract })

        contract.owner((err, res) => {
          if (err) {
            console.error('Error fetching owner.', err)
            return
          }
          this.setState({ owner: res })
        })
      }
    }
  }

  render() {
    const { classes, store: { walletStore: { account } } } = this.props
    const { contract, nbotContract, owner } = this.state

    // Show not deployed view
    if (!contract && !nbotContract) {
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
