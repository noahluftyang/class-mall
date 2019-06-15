import styled from '@emotion/styled';
import React, { memo, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { WishlistItemCard } from '../components/wishlist-item-card';
import { WishlistContext } from '../contexts/wishlist';
import { useCoupons } from '../hooks/use-coupons';
import { useWishlistFormValues } from '../hooks/use-wishlist-form-values';
import { formatPrice } from '../utils/format-price';

const WishlistWrapper = styled.section`
  margin: 0 auto;

  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const WishlistItemForm = styled.form`
  display: grid;
  row-gap: 12px;
`;

const WishlistItemHeader = styled.div`
  background-color: #ddd;
  column-gap: 6px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 100px repeat(2, 150px) 100px;
  padding: 6px;
`;

const FormSubmissionWrapper = styled.div`
  align-items: center;
  background-color: #fff;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  min-height: 48px;
  padding: 12px;
  position: sticky;

  & > *:not(:last-child) {
    margin-right: 6px;
  }
`;

const SubmitButton = styled.button`
  background-color: #fd8b2c;
  color: #fff;
  font-size: 16px;
  height: 48px;
`;

const WishlistView = memo(() => {
  const { wishlistItems } = useContext(WishlistContext);
  const coupons = useCoupons();
  const { formValues, setDiscount, setIsPurchase, setQuantity } = useWishlistFormValues(
    wishlistItems
  );
  const paymentPrice = formValues.reduce(
    (result, { calculatedPrice, isPurchase }) => (isPurchase ? result + calculatedPrice : result),
    0
  );
  const options = [
    {
      label: '쿠폰 적용안함',
      type: null,
      value: null,
    },
    ...coupons.map(({ discountAmount, discountRate, title, type }) => ({
      label: title,
      type,
      value: type === 'amount' ? discountAmount : discountRate,
    })),
  ];

  const handleSubmit = useCallback(
    e => {
      console.log(formValues);
      alert(`submit: ${JSON.stringify(formValues)}`);
      e.preventDefault();
    },
    [formValues]
  );

  return (
    <WishlistWrapper>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <WishlistItemForm onSubmit={handleSubmit}>
        <WishlistItemHeader>
          <h4>상품 정보</h4>
          <h4>상품 금액</h4>
          <h4>수량</h4>
          <h4>쿠폰 적용</h4>
          <h4>주문 금액</h4>
        </WishlistItemHeader>
        {formValues.length ? (
          formValues.map(({ id, ...formValue }, index) => (
            <WishlistItemCard
              {...formValue}
              index={index}
              key={`product-item-${id}`}
              onCheckboxChange={setIsPurchase}
              onInputChange={setQuantity}
              onSelectChange={setDiscount}
              options={options}
            />
          ))
        ) : (
          <span>장바구니가 비어있습니다.</span>
        )}
        <FormSubmissionWrapper>
          <strong>결제금액: {formatPrice(paymentPrice)}</strong>
          <SubmitButton type="submit">결제하기</SubmitButton>
        </FormSubmissionWrapper>
      </WishlistItemForm>
    </WishlistWrapper>
  );
});

export default WishlistView;
