// src/components/common/Navbar/Navbar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Avatar } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import MediumIcon from '../Navbar/MediumIcon'; 
import LanguageBalloon from '../LanguageBallon/LanguageBallon';
import avatarImage from '../../../assets/images/avatar.jpeg';

interface NavLink {
  id: 'about' | 'books' | 'blog' | 'portfolio' | 'contact';
  href: string;
}

const navLinks: NavLink[] = [
  { id: 'about', href: '/sobre' },
  { id: 'books', href: '/livros' },
  { id: 'blog', href: '/blog' },
  { id: 'portfolio', href: '/portfolio' },
  { id: 'contact', href: '/contato' },
];

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const getTranslatedLink = (linkId: string) => {
    const translationKey = `nav.links.${linkId}`;
    return t(translationKey);
  };



  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: '#000000',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        height: '80px',
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center'
        }}>
          <Avatar 
            alt="Profile"
            src={avatarImage}
            sx={{ 
              width: 50, 
              height: 50,
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
            }}
          />
          <Box sx={{ 
            position: 'absolute',
            top: -15,
            left: 45,
          }}>
            <LanguageBalloon 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </Box>
        </Box>

        <Box sx={{ 
          display: { xs: 'none', md: 'flex' },
          gap: 4,
          flex: 1,
          justifyContent: 'center',
          ml: 8
        }}>
          {navLinks.map((link) => (
            <Typography
              key={link.id}
              component="a"
              href={link.href}
              sx={{
                color: '#FFFFFF',
                textDecoration: 'none',
                fontFamily: 'Michroma, sans-serif',
                fontSize: '14px',
                letterSpacing: '0.1em',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FFFFFF',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {getTranslatedLink(link.id)}
            </Typography>
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 2
        }}>
          <IconButton
            href="https://www.linkedin.com/in/rodrigoalexandre79"
            target="_blank"
            aria-label="LinkedIn profile"
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                color: '#0077B5'
              }
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://github.com/narradorww"
            target="_blank"
            aria-label="GitHub profile"
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                color: '#6e5494'
              }
            }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://medium.com/@rodrigoalexandre"
            target="_blank"
            aria-label="Medium profile"
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                color: '#00AB6C'
              }
            }}
          >
            <MediumIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;