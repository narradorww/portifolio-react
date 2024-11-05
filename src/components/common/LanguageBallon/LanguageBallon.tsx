// src/components/common/LanguageBalloon/LanguageBalloon.tsx
import React, { useState } from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SpeechBalloonIcon from './SpeechBalloonIcon';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

interface LanguageBalloonProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const LanguageBalloon: React.FC<LanguageBalloonProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentFlag = languages.find(lang => lang.code === currentLanguage)?.flag || '🇧🇷';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 2,
          width: 40,
          height: 40,
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        <SpeechBalloonIcon
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            color: '#FFFFFF',
          }}
        />
        <Typography
          sx={{
            position: 'relative',
            fontSize: '20px',
            zIndex: 1,
            transform: 'translateY(-1px)'
          }}
        >
          {currentFlag}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#000000',
            border: '2px solid #FFFFFF',
            borderRadius: '12px',
            mt: 1,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            selected={currentLanguage === language.code}
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '20px' }}>{language.flag}</Typography>
              <Typography sx={{ 
                fontFamily: 'Michroma, sans-serif',
                fontSize: '14px'
              }}>
                {language.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageBalloon;