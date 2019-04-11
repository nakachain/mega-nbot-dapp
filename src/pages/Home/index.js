import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, List, ListItem, withStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import styles from './styles'
import { getExplorerLink, getDocumentationLink, getNakaWalletChromeLink } from '../../utils/links'

@inject('store')
@observer
class Home extends Component {
  render() {
    const {
      classes,
      store: {
        walletStore: { network },
      },
    } = this.props

    return (
      <div>
        <Typography variant="h4" className={classes.heading}>
          Welcome to the Nakachain Decentralized App!
        </Typography>

        <Typography variant="body1" className={classes.intro}>
          Select an option on the side bar to start interacting with Nakachain.
        </Typography>

        <Typography variant="h6">
          Links
        </Typography>
        <List>
          <ListItem>
            <a href={getExplorerLink(network)} target="blank">Explorer</a>
          </ListItem>
          <ListItem>
            <a href={getDocumentationLink()} target="blank">Documentation</a>
          </ListItem>
          <ListItem>
            <a href={getNakaWalletChromeLink()} target="blank">
              Naka Wallet Chrome Extension
            </a>
          </ListItem>
        </List>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object,
}

export default withStyles(styles)(Home)
