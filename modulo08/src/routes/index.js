import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Route from './Route';

import history from '~/services/history';
import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';

import GlobalStyle from '~/styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store, persistor } from '~/store';

export default function Routes() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/register" component={SignUp} />

            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Route path="/profile" component={Profile} isPrivate />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}
