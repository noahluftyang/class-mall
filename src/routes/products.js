import React, { memo, useEffect, useState } from 'react';

import * as mallApi from '../api';

function formatPrice(price) {
  return Intl.NumberFormat('ko', { currency: 'KRW', style: 'currency' }).format(price);
}

function sortByScore(items) {
  return items.sort((formerItem, latterItem) => latterItem.score - formerItem.score);
}

export const Products = memo(() => {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    async function readProductItems() {
      try {
        const { productItems } = await mallApi.readProductItems();
        const sortedProductItems = sortByScore(productItems);
        setProductItems(sortedProductItems);
      } catch (error) {
        Promise.reject(error);
      }
    }

    readProductItems();
  }, []);

  return (
    <div>
      {productItems.map(({ coverImage, id, price, title }) => (
        <div key={`product-item-${id}`}>
          <img alt={title} src={coverImage} />
          <h4>{title}</h4>
          <p>가격: {formatPrice(price)}</p>
        </div>
      ))}
    </div>
  );
});
