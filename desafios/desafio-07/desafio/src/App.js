import 'react-native-gesture-handler';
import React from 'react';

import './config/Reactotronconfig';

import { Provider } from 'react-redux';

import Routes from './routes';
import store from './store/index';

import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Routes />
    </Provider>
  );
};

export default App;
