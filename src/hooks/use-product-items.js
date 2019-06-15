import { useCallback, useEffect, useReducer } from 'react';

import * as mallApi from '../api';
import { sortByScore } from '../utils/sort-by-score';

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
  isLoading: false,
  productItems: [],
  totalCount: 1,
});

export function useProductItems() {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  useEffect(() => {
    readProductItems();
  }, [readProductItems]);

  return state;
}
