import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import NotLoggedIn from './NotLoggedIn'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import Content from './Content'
import { getAccount, getNetwork } from '../../utils/web3'

@inject('store')
@observer
class Dashboard extends Component {
  componentDidMount() {
    const { store: { walletStore: { setAccount, setNetwork } } } = this.props

    getAccount(account => setAccount(account))
    getNetwork(network => setNetwork(network))
  }

  render() {
    const {
      classes,
      store: {
        walletStore: { account, network },
      },
    } = this.props

    if (!account || !network) {
      return <NotLoggedIn />
    }

    return (
      <div className={classes.root}>
        <TopBar title="Home" />
        <div className={classes.container}>
          <Sidebar />
          <Content />
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object,
}

export default withStyles(styles)(Dashboard)
