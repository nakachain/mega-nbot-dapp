import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Typography, withStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import { changeLang } from '../../localization'

@withStyles(styles)
@inject('store')
@observer
class LanguageSelectorBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  renderLangLink = (lang, msgId) => {
    const {
      classes,
    } = this.props

    return (
      <Typography
        variant="button"
        className={classes.langItem}
        onClick={() => changeLang(lang)}
      >
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
        {this.renderLangLink('en', 'english')}
        {this.renderLangLink('zh', 'chinese')}
      </div>
    )
  }
}

export default LanguageSelectorBar
