import styled from '@emotion/styled';
import React, { memo, useCallback, useEffect, useReducer, useState } from 'react';

const PaginationWrapper = styled.div`
  display: flex;

  & > button:not(:first-of-type) {
    margin-left: 6px;
  }
`;

export const Pagination = memo(props => {
  const { onChange, page, size, totalCount } = props;

  const decrementPage = () => {};

  const handlePage = e => {
    const { value } = e.currentTarget;
    const page = Number(value) || 1;
    onChange && onChange(page);
  };

  const incrementPage = () => {};

  return (
    <PaginationWrapper>
      <button onClick={decrementPage}>prev</button>
      <button onClick={handlePage} value={1}>
        1
      </button>
      <button onClick={handlePage} value={2}>
        2
      </button>
      <button onClick={handlePage} value={3}>
        3
      </button>
      <button onClick={incrementPage}>next</button>
    </PaginationWrapper>
  );
});
