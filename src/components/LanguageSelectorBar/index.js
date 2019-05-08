import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { FormControl, Select, MenuItem, Typography, withStyles } from '@material-ui/core'

import { FormattedMessage } from 'react-intl'
import styles from './styles'
import { getCurrentLang, changeLang } from '../../localization'

@withStyles(styles)
@inject('store')
@observer
class LanguageSelectorBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  state = {
    lang: getCurrentLang(),
  }

  onChange = (event) => {
    this.setState({ lang: event.target.value })
    changeLang(event.target.value)
  }

  render() {
    const { classes } = this.props
    const { lang } = this.state

    return (
      <div className={classes.root}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
        >
          <Select
            className={classes.languageSelect}
            inputProps={{
              classes: {
                icon: classes.languageSelectIcon,
              },
            }}
            value={lang}
            onChange={this.onChange}
            disableUnderline
          >
            <MenuItem value={'en'}><FormattedMessage id="english" defaultMessage="English" /></MenuItem>
            <MenuItem value={'zh'}><FormattedMessage id="chinese" defaultMessage="中文" /></MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default LanguageSelectorBar
