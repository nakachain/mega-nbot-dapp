import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as StoreProvider } from 'mobx-react'
import theme from './theme'
import css from './style.css' // eslint-disable-line
import Dashboard from './pages/Dashboard'
import AppStore from './stores/app-store'

const store = new AppStore()
window.store = store // Expose store in window for debugging

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <StoreProvider store={store}>
          <MuiThemeProvider theme={theme}>
            <Dashboard />
          </MuiThemeProvider>
        </StoreProvider>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app')) // eslint-disable-line
