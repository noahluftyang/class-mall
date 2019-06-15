import React, { memo, useEffect, useState } from 'react';

import * as mallApi from '../api';

function sortByScore(items) {
  return items;
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
      {productItems.map(productItem => (
        <div>{JSON.stringify(productItem)}</div>
      ))}
    </div>
  );
});
