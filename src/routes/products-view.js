import styled from '@emotion/styled';
import React, { memo, useCallback, useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ItemCard } from '../components/item-card';
import { Pagination } from '../components/pagination';
import { WishlistContext } from '../contexts/wishlist';
import { useProductItems } from '../hooks/use-product-items';

const SIZE = 5;

const ProductsWrapper = styled.section`
  margin: 0 auto;

  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const ProductItemList = styled.div`
  display: grid;
  row-gap: 12px;
`;

const ProductItemCard = styled(ItemCard)`
  align-items: center;
  column-gap: 6px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 300px 1fr repeat(2, 100px);
  padding: 6px;
`;

const ProductsView = memo(() => {
  const { addWishlistItem, removeWishlistItem, wishlistItems } = useContext(WishlistContext);
  const [page, setPage] = useState(1);
  const { productItems, totalCount } = useProductItems();

  const handleAddClick = useCallback(
    e => {
      const { value } = e.currentTarget;
      const wishlistItem = productItems.find(productItem => productItem.id === value);
      addWishlistItem(wishlistItem);
    },
    [addWishlistItem, productItems]
  );

  const handleRemoveClick = useCallback(
    e => {
      const { value } = e.currentTarget;
      removeWishlistItem(value);
    },
    [removeWishlistItem]
  );

  const handlePageChange = useCallback(page => {
    setPage(page);
  }, []);

  return (
    <ProductsWrapper>
      <Helmet>
        <title>클래스</title>
      </Helmet>
      <ProductItemList>
        {productItems
          .slice((page - 1) * SIZE, page * SIZE)
          .map(({ coverImage, id, price, title }) => {
            const isWishlistItemsHaveProductItem = wishlistItems.some(
              wishlistItem => wishlistItem.id === id
            );
            const isDisabled = !isWishlistItemsHaveProductItem && wishlistItems.length >= 3;
            const handleButtonClick = isWishlistItemsHaveProductItem
              ? handleRemoveClick
              : handleAddClick;

            return (
              <ProductItemCard
                coverImage={coverImage}
                key={`product-item-${id}`}
                price={price}
                title={title}
              >
                <button disabled={isDisabled} onClick={handleButtonClick} value={id}>
                  {isWishlistItemsHaveProductItem ? '빼기' : '담기'}
                </button>
              </ProductItemCard>
            );
          })}
      </ProductItemList>
      <Pagination onChange={handlePageChange} page={page} size={SIZE} totalCount={totalCount} />
    </ProductsWrapper>
  );
});

export default ProductsView;
