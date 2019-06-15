import styled from '@emotion/styled';
import React, { memo, useCallback, useEffect, useReducer, useState } from 'react';

import * as mallApi from '../api';
import { ItemCard } from '../components/item-card';
import { Pagination } from '../components/pagination';
import { sortByScore } from '../utils/sort-by-score';

const ProductsWrapper = styled.section`
  display: grid;
  row-gap: 24px;
`;

const types = Object.freeze({
  SET_PRODUCT_ITEMS: 'SET_PRODUCT_ITEMS',
});

const reducer = (state, action) => {
  const { productItems, totalCount, type } = action;
  const states = Object.freeze({
    [types.SET_PRODUCT_ITEMS]: {
      ...state,
      productItems,
      totalCount,
    },
  });

  return states[type] || state;
};

const initialState = Object.freeze({
  productItems: [],
  totalCount: 1,
});

const SIZE = 5;

export const Products = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(1);
  const { productItems, totalCount } = state;

  const setProductItems = useCallback((productItems, totalCount) => {
    dispatch({ productItems, totalCount, type: types.SET_PRODUCT_ITEMS });
  }, []);

  const readProductItems = useCallback(async () => {
    try {
      const { productItems, totalCount } = await mallApi.readProductItems();
      const sortedProductItems = sortByScore(productItems);
      setProductItems(sortedProductItems, totalCount);
    } catch (error) {
      Promise.reject(error);
    }
  }, [setProductItems]);

  const handlePageChange = useCallback(page => {
    setPage(page);
  }, []);

  useEffect(() => {
    readProductItems();
  }, [readProductItems]);

  return (
    <ProductsWrapper>
      {productItems
        .slice((page - 1) * SIZE, page * SIZE)
        .map(({ coverImage, id, price, title }) => (
          <ItemCard coverImage={coverImage} key={`product-item-${id}`} price={price} title={title}>
            <button>담기</button>
          </ItemCard>
        ))}
      <Pagination onChange={handlePageChange} page={page} size={SIZE} totalCount={totalCount} />
    </ProductsWrapper>
  );
});
