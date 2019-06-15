import React, { createContext } from 'react';

import { useWishlistItems } from '../hooks/use-wishlist-items';

export const WishlistContext = createContext({});

export const WishlistProvider = ({ children }) => {
  const value = useWishlistItems();

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const WishlistConsumer = WishlistContext.Consumer;
