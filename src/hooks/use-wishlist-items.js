import { useCallback, useState } from 'react';

import { productItems } from '../api/product-items';

export function useWishlistItems() {
  const [wishlistItems, setWishlistItems] = useState(productItems);

  const addWishlistItem = useCallback(
    wishlistItem => {
      const newWishlistItems = [...wishlistItems, wishlistItem];
      setWishlistItems(newWishlistItems);
    },
    [wishlistItems]
  );

  const removeWishlistItem = useCallback(
    id => {
      const newWishlistItems = wishlistItems.filter(wishlistItem => wishlistItem.id !== id);
      setWishlistItems(newWishlistItems);
    },
    [wishlistItems]
  );

  const actions = {
    addWishlistItem,
    removeWishlistItem,
  };

  return { ...actions, wishlistItems };
}
