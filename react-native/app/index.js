import React, {Component} from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
import MainContainer from './containers/main';


const logger = createLogger()
const middleware = applyMiddleware(logger, thunk);
const store = createStore(reducers, middleware);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}


export default App;
