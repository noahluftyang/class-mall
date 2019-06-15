import React, { lazy, memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ProductsView = lazy(() => import('./products-view'));
const WishlistView = lazy(() => import('./wishlist-view'));

export const Routes = memo(() => {
  return (
    <Switch>
      <Route component={ProductsView} path="/products" />
      <Route component={WishlistView} path="/wishlist" />
      <Redirect to="/products" />
    </Switch>
  );
});
