import styled from '@emotion/styled';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const HeaderWrapper = styled.header`
  align-items: center;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  position: sticky;
  top: 0;
`;

const TopNavigation = styled.nav`
  & > a:not(:last-child) {
    margin-right: 24px;
  }
`;

const ActiveNavLink = styled(NavLink)`
  color: #000;
  text-decoration: none;

  &.active {
    color: #fd8b2c;
  }
`;

export const Header = memo(() => (
  <HeaderWrapper>
    <h1>CLASS MALL</h1>
    <TopNavigation>
      <ActiveNavLink to="/products">클래스</ActiveNavLink>
      <ActiveNavLink to="/wishlist">장바구니</ActiveNavLink>
    </TopNavigation>
  </HeaderWrapper>
));
