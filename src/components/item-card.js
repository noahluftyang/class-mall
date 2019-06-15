import styled from '@emotion/styled';
import React, { memo } from 'react';

import { formatPrice } from '../utils/format-price';

const ItemCardWrapper = styled.div`
  border: 1px solid #333;
`;

const CoverImage = styled.img`
  max-height: 200px;
`;

export const ItemCard = memo(({ children, coverImage, id, price, title }) => (
  <ItemCardWrapper key={`product-item-${id}`}>
    <CoverImage alt={title} src={coverImage} />
    <h4>{title}</h4>
    <p>가격: {formatPrice(price)}</p>
    {children}
  </ItemCardWrapper>
));
