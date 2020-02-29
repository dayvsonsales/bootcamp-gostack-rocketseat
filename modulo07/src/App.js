import React from 'react';
import Routes from './routes';

import './config/Reactotronconfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
