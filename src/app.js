import 'sanitize.css';
import styled from '@emotion/styled';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

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
        <Helmet titleTemplate="Class Mall | %s" />
        <GlobalStyles />
        <Header />
        <Routes />
      </AppWrapper>
    </WishlistProvider>
  );
});
