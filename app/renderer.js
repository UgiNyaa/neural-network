import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Validator from 'redux-validator';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import neuronNetworkApp from './reducers'
import App from './App.js'

const validator = Validator();
const createStoreWithMiddleware = applyMiddleware(validator)(createStore);

let store = createStoreWithMiddleware(neuronNetworkApp)

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
