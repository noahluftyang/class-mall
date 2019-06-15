import styled from '@emotion/styled';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { v4 } from 'uuid';

import * as mallApi from '../api';
import { ItemCard } from '../components/item-card';

const WishlistWrapper = styled.section``;

export const Wishlist = memo(() => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const readCoupons = useCallback(async () => {
    try {
      const { coupons } = await mallApi.readCoupons();
      setCoupons(coupons);
    } catch (error) {
      Promise.reject(error);
    }
  }, []);

  useEffect(() => {
    readCoupons();
  });

  return (
    <WishlistWrapper>
      {wishlistItems.map(({ coverImage, id, price, title }) => (
        <ItemCard key={`product-item-${id}`}>
          <input type="checkbox" />
          <button>구매하기</button>
          <select>
            {coupons.map(({ title }) => {
              const key = v4();

              return (
                <option key={key} value={10}>
                  {title}
                </option>
              );
            })}
          </select>
        </ItemCard>
      ))}
    </WishlistWrapper>
  );
});
