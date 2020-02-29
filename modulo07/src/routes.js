import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound404 from './pages/NotFound404';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home}></Route>
    <Route path="/cart" component={Cart}></Route>
    <Route component={NotFound404}></Route>
  </Switch>
);

export default Routes;
