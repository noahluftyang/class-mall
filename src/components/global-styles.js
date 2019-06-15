import { Global, css } from '@emotion/core';
import React from 'react';

const styles = css`
  *,
  *:before,
  *:after {
    word-break: keep-all;
  }

  html {
    font-size: 14px;
  }

  body {
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  button {
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    outline: 0;
    padding: 6px 12px;
  }

  #root {
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
