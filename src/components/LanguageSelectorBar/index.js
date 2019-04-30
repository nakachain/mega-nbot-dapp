import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, withStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import styles from './styles'

@withStyles(styles)
@inject('store')
@observer
class LanguageSelectorBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  renderLangLink = (msgId) => {
    const {
      classes,
    } = this.props

    return (
      <Typography variant="button" className={classes.langItem}>
        <FormattedMessage id={msgId} />
      </Typography>
    )
  }

  render() {
    const {
      classes,
    } = this.props

    return (
      <div className={classes.root}>
        {this.renderLangLink('englishUS')}
        {this.renderLangLink('chinese')}
      </div>
    )
  }
}

export default LanguageSelectorBar
