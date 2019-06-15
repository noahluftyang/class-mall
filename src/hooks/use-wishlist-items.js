import { useCallback, useState } from 'react';

export function useWishlistItems() {
  const [wishlistItems, setWishlistItems] = useState([]);

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
