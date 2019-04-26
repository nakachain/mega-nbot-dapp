import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper, withStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import TopBar from './TopBar'
import MegaNBOT from '../MegaNBOT'

@withStyles(styles)
@inject('store')
@observer
class Dashboard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <TopBar title="Home" />
        <div className={classes.container}>
          <Paper className={classes.paper} elevation={8}>
            <MegaNBOT />
          </Paper>
        </div>
      </div>
    )
  }
}

export default Dashboard
