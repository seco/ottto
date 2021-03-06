import React, { Component } from 'react'
import Scenes from './scenes'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const logger = createLogger()
const middleware = applyMiddleware(logger, thunk)
const store = createStore(reducers, middleware)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Scenes />
      </Provider>
    )
  }
}


export default App
