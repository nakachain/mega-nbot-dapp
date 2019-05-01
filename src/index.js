import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as StoreProvider } from 'mobx-react'
import { IntlProvider } from 'react-intl'
import theme from './theme'
import css from './style.css' // eslint-disable-line
import getLocalizedData from './localization'
import Dashboard from './pages/Dashboard'
import AppStore from './stores/app-store'

// MobX setup
const store = new AppStore()

// Expose store in window for debugging
if (process.env.NODE_ENV === 'development') {
  window.store = store
}

// React intl setup
const { locale, messages } = getLocalizedData()

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <StoreProvider store={store}>
          <MuiThemeProvider theme={theme}>
            <IntlProvider locale={locale} messages={messages}>
              <Dashboard />
            </IntlProvider>
          </MuiThemeProvider>
        </StoreProvider>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app')) // eslint-disable-line
