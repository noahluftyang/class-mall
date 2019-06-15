import 'sanitize.css';
import styled from '@emotion/styled';
import React, { memo } from 'react';

import { Routes } from './routes';

const AppWrapper = styled.div`
  height: 100%;
`;

export const App = memo(() => {
  return (
    <AppWrapper>
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Routes />
    </AppWrapper>
  );
});
