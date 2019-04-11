import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import styles from './styles'
import Home from '../../Home'
import AddressNameService from '../../AddressNameService'
import MegaNBOT from '../../MegaNBOT'
import NotFound from '../../NotFound'

const Content = ({ classes }) => (
  <div className={classes.root}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/ans' component={AddressNameService} />
      <Route exact path='/mega-nbot' component={MegaNBOT} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default withStyles(styles)(Content)
