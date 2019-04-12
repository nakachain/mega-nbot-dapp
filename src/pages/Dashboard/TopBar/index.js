import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import Logo from '../../../../static/images/naka_text_logo_white.png'

const TopBar = ({ classes, store: { walletStore: { account, network } } }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftContainer}>
          <img src={Logo} className={classes.logo} />
        </div>
        <div className={classes.infoContainer}>
          <Typography color="secondary">{network}</Typography>
          <Typography color="secondary">{account}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  </div>
)

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  store: PropTypes.object,
}

export default withStyles(styles)(withRouter(inject('store')(observer(TopBar))))
