import { useCallback, useState, useEffect } from 'react';

import * as mallApi from '../api';

export function useCoupons() {
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

  return coupons;
}
