import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, FormControl, Select, MenuItem, Typography, withStyles } from '@material-ui/core'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import Constants from '../../../constants'
import Logo from '../../../../static/images/naka_text_logo_white.png'

const { NETWORK: { MAINNET, TESTNET } } = Constants
@withStyles(styles)
@withRouter
@inject('store')
@observer
class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  onChange = (event) => {
    this.props.store.chainStore.setNetwork(event.target.value)
  }

  render() {
    const {
      classes,
      store: {
        walletStore: { account },
        chainStore: { network },
      },
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div className={classes.leftContainer}>
              <img src={Logo} className={classes.logo} />
              <Typography variant="h4" color="secondary">MegaNBOT</Typography>
            </div>
            <div className={classes.infoContainer}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.networkSelect}
                  inputProps={{
                    classes: {
                      icon: classes.networkSelectIcon,
                    },
                  }}
                  value={network}
                  onChange={this.onChange}
                  disableUnderline
                >
                  <MenuItem value={MAINNET}>Mainnet</MenuItem>
                  <MenuItem value={TESTNET}>Testnet</MenuItem>
                </Select>
              </FormControl>
              <Typography color="secondary">{account}</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default TopBar
