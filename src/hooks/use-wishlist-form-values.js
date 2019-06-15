import { useCallback, useEffect, useState } from 'react';

export function useWishlistFormValues(wishlistItems) {
  const [formValues, setFormValues] = useState([]);

  const getInitialValues = useCallback(() => {
    const newFormValues = wishlistItems.map(wishlistItem => ({
      ...wishlistItem,
      calculatedPrice: wishlistItem.price,
      couponType: null,
      discount: null,
      isPurchase: true,
      quantity: 1,
    }));
    setFormValues(newFormValues);
  }, [wishlistItems]);

  const setDiscount = useCallback(
    (index, couponType, discount) => {
      const { price, quantity, ...targetFormValue } = formValues[index];
      const calculatedPrice =
        couponType === 'rate'
          ? (price * quantity * (100 - discount)) / 100
          : price * quantity - discount;
      const newFormValues = [
        ...formValues.slice(0, index),
        {
          ...targetFormValue,
          calculatedPrice,
          couponType,
          discount,
          price,
          quantity,
        },
        ...formValues.slice(index + 1),
      ];
      setFormValues(newFormValues);
    },
    [formValues]
  );

  const setIsPurchase = useCallback(
    (index, isPurchase) => {
      const targetFormValue = formValues[index];
      const newFormValues = [
        ...formValues.slice(0, index),
        {
          ...targetFormValue,
          isPurchase,
        },
        ...formValues.slice(index + 1),
      ];
      setFormValues(newFormValues);
    },
    [formValues]
  );

  const setQuantity = useCallback(
    (index, quantity) => {
      const { couponType, discount, price, ...targetFormValue } = formValues[index];
      const calculatedPrice =
        couponType === 'rate'
          ? (price * quantity * (100 - discount)) / 100
          : price * quantity - discount;
      const newFormValues = [
        ...formValues.slice(0, index),
        {
          ...targetFormValue,
          calculatedPrice,
          couponType,
          discount,
          price,
          quantity,
        },
        ...formValues.slice(index + 1),
      ];
      setFormValues(newFormValues);
    },
    [formValues]
  );

  useEffect(() => {
    getInitialValues();
  }, [getInitialValues]);

  const actions = {
    setDiscount,
    setIsPurchase,
    setQuantity,
  };

  return { ...actions, formValues };
}
