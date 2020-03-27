import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import './config/Reactotron';

import { StatusBar } from 'react-native';
import Routes from './routes';

import { store, persistor } from '~/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
