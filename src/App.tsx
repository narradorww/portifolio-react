import React from 'react';
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import LandingPage from './pages/Home/LandingPage';




function App() {
  return (
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <LandingPage />
   </ThemeProvider>
  );
}

export default App;
