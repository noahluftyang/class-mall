import styled from '@emotion/styled';
import React, { memo, useCallback } from 'react';
import Select from 'react-select';

import { ItemCard } from '../components/item-card';
import { formatPrice } from '../utils/format-price';

const WishlistItemCardWrapper = styled(ItemCard)`
  align-items: center;
  column-gap: 6px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 200px 1fr 100px 80px 150px 100px;
  padding: 6px;
  position: relative;
`;

const PurchaseCheckbox = styled.input`
  left: 12px;
  top: 12px;
  position: absolute;
`;

const QuantityInput = styled.input`
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
`;

export const WishlistItemCard = memo(
  ({
    availableCoupon = true,
    calculatedPrice,
    coverImage,
    index,
    isPurchase,
    onCheckboxChange,
    onInputChange,
    onSelectChange,
    options,
    price,
    quantity,
    title,
  }) => {
    const handleCheckboxChange = useCallback(
      e => {
        const { checked } = e.currentTarget;
        onCheckboxChange(index, checked);
      },
      [index, onCheckboxChange]
    );

    const handleInputChange = useCallback(
      e => {
        const { value } = e.currentTarget;
        const quantity = Number(value);

        if (quantity >= 0) {
          onInputChange(index, quantity);
        }

        e.preventDefault();
      },
      [index, onInputChange]
    );

    const handleSelectChange = useCallback(
      e => {
        const { type, value } = e;
        onSelectChange(index, type, value);
      },
      [index, onSelectChange]
    );

    return (
      <WishlistItemCardWrapper coverImage={coverImage} price={price} title={title}>
        <PurchaseCheckbox checked={isPurchase} onChange={handleCheckboxChange} type="checkbox" />
        <QuantityInput defaultValue={quantity} onChange={handleInputChange} min="1" type="number" />
        <Select
          defaultValue={{
            label: '쿠폰 적용안함',
            type: null,
            value: null,
          }}
          isDisabled={!availableCoupon}
          onChange={handleSelectChange}
          options={options}
        />
        <p>{formatPrice(calculatedPrice)}</p>
      </WishlistItemCardWrapper>
    );
  }
);
