import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Products } from './products';
import { Wishlist } from './wishlist';

export const Routes = memo(() => {
  return (
    <Switch>
      <Route component={Products} path="/products" />
      <Route component={Wishlist} path="/wishlist" />
      <Redirect to="/products" />
    </Switch>
  );
});
