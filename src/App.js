import 'sanitize.css';
import styled from '@emotion/styled';
import React, { memo } from 'react';

import { GlobalStyles } from './components/global-styles';
import { Header } from './components/header';
import { Routes } from './routes';
import { WishlistProvider } from './contexts/wishlist';

const AppWrapper = styled.div`
  background-color: #f0f0f0;
  height: 100%;
  overflow: auto;
`;

export const App = memo(() => {
  return (
    <WishlistProvider>
      <AppWrapper>
        <GlobalStyles />
        <Header />
        <Routes />
      </AppWrapper>
    </WishlistProvider>
  );
});
