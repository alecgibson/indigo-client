import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import WebSocketMiddleware from "./source/middleware/WebSocketMiddleware";

import AppReducer from './source/reducers/AppReducer';
import AppWithNavigationState from './source/navigators/AppNavigator';

class IndigoClient extends React.Component {
  store = createStore(
    AppReducer,
    applyMiddleware(
      thunkMiddleware,
      WebSocketMiddleware,
    )
  );

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('IndigoClient', () => IndigoClient);

export default IndigoClient;
