// src/pages/Home/LandingPage.tsx
import React from 'react';
import { Box} from '@mui/material';
import Navbar from '../../components/common/Navbar/Navbar'
import Hero from '../../components/sections/Hero/Hero';
import RecentProjects from '../../components/sections/RecentProjects/RecentProjects';

const NAVBAR_HEIGHT = 80;

const LandingPage: React.FC = () => {
  

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#FFFFFF',
      position: 'relative'
    }}>
      <Navbar/>
      {/* Container para todas as seções, excluindo a navbar */}
      <Box sx={{
        mt: `${NAVBAR_HEIGHT}px`, // margem para compensar a navbar fixa
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Container do Hero com altura controlada */}
        <Box sx={{
          height: '45%', // 45% da altura disponível
          minHeight: '400px', // altura mínima para garantir boa aparência
        }}>
          <Hero />
        </Box>
        
        {/* Espaço para outras seções */}
        <Box sx={{
          height: '55%', // restante da altura disponível
          bgcolor: '#D9D9D9'
        }}>
         <RecentProjects />
        </Box>
      </Box>

     
      
    </Box>
  );
};

export default LandingPage;