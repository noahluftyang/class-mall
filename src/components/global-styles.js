import { Global, css } from '@emotion/core';
import React from 'react';

const styles = css`
  *,
  *:before,
  *:after {
    word-break: keep-all;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  #root {
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
