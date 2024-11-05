// src/pages/Home/LandingPage.tsx
import React from 'react';
import { Container, Box, Typography, Card, Avatar } from '@mui/material';
import Navbar from '../../components/common/Navbar/Navbar'

const LandingPage: React.FC = () => {
  const handleLanguageChange = () => {
    // Implementar lógica de mudança de idioma aqui
    console.log('Mudar idioma');
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#FFFFFF',
      position: 'relative'
    }}>
      <Navbar/>

      {/* Seção Principal */}
      <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
        <Box sx={{ 
          width: '200px',
          height: '200px',
          margin: '0 auto',
          borderRadius: '50%',
          overflow: 'hidden',
          mb: 4
        }}>
          <img 
            src="/api/placeholder/200/200"
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Desenvolvendo soluções no Betheflow.ai
        </Typography>
        <Typography variant="h6" sx={{ color: '#666' }}>
          R.P.G
        </Typography>
      </Container>

      {/* Seção de Reviews */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          gap: 4
        }}>
          {[1, 2, 3].map((item) => (
            <Card key={item} sx={{ 
              flex: 1,
              p: 3,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Review title
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                Review content goes here
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography variant="caption">
                  Reviewer name
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;