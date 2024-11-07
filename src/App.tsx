// src/App.tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import LandingPage from './pages/Home/LandingPage';
import { I18nextProvider } from 'react-i18next';
import AppRoutes from './routes';
import i18n from '../src/configs/il8next'

function App() {
  return (
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </I18nextProvider>
    </HashRouter>
  );
}

export default App;