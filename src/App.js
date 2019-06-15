import 'sanitize.css';
import styled from '@emotion/styled';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Routes } from './routes';

const AppWrapper = styled.div`
  height: 100%;
`;

export const App = memo(() => {
  return (
    <AppWrapper>
      <header>
        <nav>
          <NavLink to="/products">클래스</NavLink>
          <NavLink to="/wishlist">장바구니</NavLink>
        </nav>
      </header>
      <Routes />
    </AppWrapper>
  );
});
