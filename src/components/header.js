import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

export const Header = memo(() => (
  <header>
    <nav>
      <NavLink to="/products">클래스</NavLink>
      <NavLink to="/wishlist">장바구니</NavLink>
    </nav>
  </header>
));
