// src/components/common/LanguageBalloon/LanguageBalloon.tsx
import React, { useState } from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import SpeechBalloonIcon from './SpeechBalloonIcon';

interface Language {
  code: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'pt-BR', flag: '🇧🇷' },
  { code: 'en', flag: '🇬🇧' },
  { code: 'fr', flag: '🇫🇷' },
];

interface LanguageBalloonProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const DEFAULT_LANGUAGE = 'pt-BR';

const LanguageBalloon: React.FC<LanguageBalloonProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);
  const currentFlag = LANGUAGES.find(lang => lang.code === currentLanguage)?.flag || '🇧🇷';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      onLanguageChange(languageCode);
      handleClose();
    } catch (error) {
      console.error('Error changing language:', error);
      // Você pode adicionar aqui um tratamento de erro mais elaborado
    }
  };

  const renderLanguageIcon = () => (
    <Box
      onClick={handleClick}
      aria-label={t('select')}
      role="button"
      tabIndex={0}
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
        },
        '&:focus': {
          outline: 'none',
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
          transform: 'translateY(-1px)',
          userSelect: 'none'
        }}
      >
        {currentFlag}
      </Typography>
    </Box>
  );

  const renderLanguageMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: '#000000',
          border: '2px solid #FFFFFF',
          borderRadius: '12px',
          mt: 1,
          minWidth: '150px',
          '& .MuiList-root': {
            padding: '4px',
          }
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {LANGUAGES.map((language) => (
        <MenuItem
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          selected={currentLanguage === language.code}
          sx={{
            borderRadius: '8px',
            color: '#FFFFFF',
            padding: '8px 16px',
            margin: '2px 0',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              transform: 'translateX(4px)',
            },
            '&.Mui-selected': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            width: '100%'
          }}>
            <Typography sx={{ 
              fontSize: '20px',
              width: '24px',
              textAlign: 'center'
            }}>
              {language.flag}
            </Typography>
            <Typography sx={{ 
  fontFamily: 'Michroma, sans-serif',
  fontSize: '14px',
  flex: 1
}}>
  {language.code === 'pt-BR' && 'Português'}
  {language.code === 'en' && 'English'}
  {language.code === 'fr' && 'Français'}
</Typography>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      {renderLanguageIcon()}
      {renderLanguageMenu()}
    </>
  );
};

export default LanguageBalloon;