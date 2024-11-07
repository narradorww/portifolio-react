// src/components/sections/RecentProjects/RecentProjects.tsx
import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button, Chip, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RecentProjects: React.FC = () => {
  const { t } = useTranslation();

  const renderProjectCard = (projectKey: string) => {
    const tags = t(`recentProjects.projects.${projectKey}.tags`, { returnObjects: true }) as string[];

    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#1A1A1A',
          border: '1px solid #333',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div"
            sx={{ 
              color: '#FFFFFF',
              fontFamily: 'Michroma, sans-serif',
              fontSize: '1.2rem',
              mb: 2
            }}
          >
            {t(`recentProjects.projects.${projectKey}.title`)}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#CCCCCC',
              mb: 2,
              minHeight: '60px'
            }}
          >
            {t(`recentProjects.projects.${projectKey}.description`)}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: '#333',
                  color: '#FFF',
                  '&:hover': {
                    bgcolor: '#444',
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/portfolio/${projectKey}`}
            size="small"
            sx={{
              color: '#FFF',
              textDecoration: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            {t('recentProjects.viewMore')}
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: '#000000',
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            color: '#FFFFFF',
            fontFamily: 'Michroma, sans-serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            textAlign: 'center',
            mb: 6,
          }}
        >
          {t('recentProjects.title')}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: 4,
          }}
        >
          {['recicleLink', 'rescueVision', 'logisticAI'].map((projectKey) => (
            <Box key={projectKey}>
              {renderProjectCard(projectKey)}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RecentProjects;