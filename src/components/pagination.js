import styled from '@emotion/styled';
import React, { memo, useCallback } from 'react';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;

  & > button:not(:first-of-type) {
    margin-left: 6px;
  }
`;

const PageButton = styled.button`
  background-color: ${({ active }) => (active ? '#fd8b2c' : '#fff')};
  border-color: #fd8b2c;
  color: ${({ active }) => (active ? '#fff' : '#000')};
`;

export const Pagination = memo(({ onPageClick, page, size, totalCount }) => {
  const totalPage = Math.ceil(totalCount / size);
  const isPrevDisabled = page < 2;
  const isNextDisabled = page > totalPage - 1;

  const handlePrevButtonClick = useCallback(() => {
    const newPage = page - 1;
    onPageClick(newPage);
  }, [onPageClick, page]);

  const handlePageButtonClick = useCallback(
    e => {
      const { value } = e.currentTarget;
      const page = Number(value) || 1;
      onPageClick(page);
    },
    [onPageClick]
  );

  const handleNextButtonClick = useCallback(() => {
    const newPage = page + 1;
    onPageClick(newPage);
  }, [onPageClick, page]);

  return (
    <PaginationWrapper>
      <PageButton disabled={isPrevDisabled} onClick={handlePrevButtonClick}>
        prev
      </PageButton>
      {[...Array(totalPage)].map((value, index) => {
        const pageValue = index + 1;

        return (
          <PageButton
            active={page === pageValue}
            key={`page-${pageValue}`}
            onClick={handlePageButtonClick}
            value={pageValue}
          >
            {pageValue}
          </PageButton>
        );
      })}
      <PageButton disabled={isNextDisabled} onClick={handleNextButtonClick}>
        next
      </PageButton>
    </PaginationWrapper>
  );
});
