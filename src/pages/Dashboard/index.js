import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import NotLoggedIn from './NotLoggedIn'
import TopBar from './TopBar'
import MegaNBOT from '../MegaNBOT'

@inject('store')
@observer
class Dashboard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
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
          <MegaNBOT />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
