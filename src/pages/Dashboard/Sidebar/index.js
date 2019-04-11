import React from 'react'
import PropTypes from 'prop-types'
import { Paper, List, ListItem, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styles from './styles'

const Sidebar = ({ classes }) => (
  <Paper className={classes.root}>
    <List component="nav">
      <ListItem><Link to="/" className={classes.link}>Home</Link></ListItem>
      <ListItem><Link to="/ans" className={classes.link}>Address Name Service</Link></ListItem>
      <ListItem><Link to="/mega-nbot" className={classes.link}>MegaNBOT</Link></ListItem>
    </List>
  </Paper>
)

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Sidebar)
