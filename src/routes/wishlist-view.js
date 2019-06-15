import styled from '@emotion/styled';
import React, { memo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 } from 'uuid';

import { ItemCard } from '../components/item-card';
import { WishlistContext } from '../contexts/wishlist';
import { useCoupons } from '../hooks/use-coupons';

const WishlistWrapper = styled.section`
  margin: 0 auto;

  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const WishlistItemList = styled.div`
  display: grid;
  row-gap: 12px;
`;

const WishlistItemHeader = styled.div`
  background-color: #ececec;
  column-gap: 6px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr repeat(4, 100px);
  padding: 6px;
`;

const WishlistItemCard = styled(ItemCard)`
  align-items: center;
  column-gap: 6px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 200px 1fr repeat(4, 100px);
  padding: 6px;
`;

const WishlistView = memo(() => {
  const { wishlistItems } = useContext(WishlistContext);
  const coupons = useCoupons();

  const handleChange = (e, f, g) => {
    console.log(e.currentTarget.value, e, f, g);
  };

  return (
    <WishlistWrapper>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <WishlistItemList>
        <WishlistItemHeader>
          <h4>상품 정보</h4>
          <h4>상품 금액</h4>
          <h4>수량</h4>
          <h4>쿠폰 적용</h4>
          <h4>주문 금액</h4>
        </WishlistItemHeader>
        {wishlistItems.map(({ availableCoupon = true, coverImage, id, price, title }) => (
          <WishlistItemCard
            coverImage={coverImage}
            key={`product-item-${id}`}
            price={price}
            title={title}
          >
            {/* <input type="checkbox" /> */}
            <label>
              <span>수량</span>
              <input defaultValue={1} type="number" />
            </label>
            <select disabled={!availableCoupon} onChange={handleChange}>
              <option value={null}>쿠폰 적용안함</option>
              {coupons.map(({ title }) => {
                const key = v4();

                return (
                  <option key={key} value={10}>
                    {title}
                  </option>
                );
              })}
            </select>
            <p>0</p>
          </WishlistItemCard>
        ))}
      </WishlistItemList>
    </WishlistWrapper>
  );
});

export default WishlistView;
