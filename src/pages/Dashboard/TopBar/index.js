import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Grid, FormControl, Select, MenuItem, Typography, withStyles } from '@material-ui/core'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import { NETWORK } from '../../../constants'
import Logo from '../../../../static/images/naka_text_logo_white.png'

const { MAINNET, TESTNET } = NETWORK

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
    this.props.store.chainStore.setSelectedNetwork(event.target.value)
  }

  render() {
    const {
      classes,
      store: {
        walletStore: { account },
        chainStore: { selectedNetwork },
      },
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Grid container>
              <Grid item sm={6} xs={12} className={classes.gridItem}>
                <div className={classes.leftContainer}>
                  <img src={Logo} className={classes.logo} />
                  <Typography variant="h4" color="secondary">MegaNBOT</Typography>
                </div>
              </Grid>
              <Grid item sm={6} xs={12} className={classes.gridItem}>
                <div className={classes.infoContainer}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      className={classes.networkSelect}
                      inputProps={{
                        classes: {
                          icon: classes.networkSelectIcon,
                        },
                      }}
                      value={selectedNetwork}
                      onChange={this.onChange}
                      disableUnderline
                    >
                      <MenuItem value={MAINNET}>Mainnet</MenuItem>
                      <MenuItem value={TESTNET}>Testnet</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography color="secondary">{account}</Typography>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default TopBar
