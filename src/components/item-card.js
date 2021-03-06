import styled from '@emotion/styled';
import React, { memo } from 'react';

import { formatPrice } from '../utils/format-price';

const ItemCardWrapper = styled.div`
  background-color: #fff;
`;

const CoverImage = styled.img`
  min-height: 150px;
  max-width: 100%;
  object-fit: contain;
`;

export const ItemCard = memo(({ children, className, coverImage, id, price, title }) => (
  <ItemCardWrapper className={className} key={`product-item-${id}`}>
    <CoverImage alt={title} src={coverImage} />
    <h4>{title}</h4>
    <p>{formatPrice(price)}</p>
    {children}
  </ItemCardWrapper>
));
