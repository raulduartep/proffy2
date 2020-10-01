import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';

import lightTheme from './assets/styles/theme/light';
import GlobalStyles from './assets/styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
