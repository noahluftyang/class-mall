import { coupons } from './coupons';
import { productItems } from './product-items';

function fakeFetch(url, result) {
  return new Promise(resolve => {
    setTimeout(() => resolve(result), 2000);
  });
}

export async function readCoupons() {
  const response = {
    coupons,
    message: 'success',
  };

  return fakeFetch('/api/coupons', response);
}

export async function readProductItems() {
  const response = {
    message: 'success',
    productItems,
    totalCount: productItems.length,
  };

  return fakeFetch('/api/product/items', response);
}
