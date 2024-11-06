// src/components/sections/Hero/Hero.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Importando as imagens
import avatarImage from '../../../assets/images/avatar.jpeg';
import devImage from '../../../assets/images/dev.png';
import dungeonMasterImage from '../../../assets/images/dungeon-master.png';
import forestFarmerImage from '../../../assets/images/forestfarmer.png';
import teamLeaderImage from '../../../assets/images/team-leader.png';

interface Facet {
  id: string;
  leftTitle: string | null;
  rightTitle: string | null;
  leftDescription: string;
  rightDescription: string;
  image: string;
}

const facets: Facet[] = [
  {
    id: 'dev',
    leftTitle: null,
    rightTitle: 'Developer',
    leftDescription: 'Arquitetando soluções elegantes e eficientes.',
    rightDescription: 'Desenvolvendo soluções criativas com código.',
    image: devImage,
  },
  {
    id: 'dungeon-master',
    leftTitle: 'Mestre de',
    rightTitle: 'RPG',
    leftDescription: 'Criando mundos fantásticos e histórias memoráveis.',
    rightDescription: 'Guiando aventureiros em jornadas épicas.',
    image: dungeonMasterImage,
  },
  {
    id: 'forest-farmer',
    leftTitle: 'Forest',
    rightTitle: 'Farmer',
    leftDescription: 'Cultivando consciência ambiental.',
    rightDescription: 'Promovendo sustentabilidade e conexão com a natureza.',
    image: forestFarmerImage,
  },
  {
    id: 'team-leader',
    leftTitle: 'Team',
    rightTitle: 'Leader',
    leftDescription: 'Guiando equipes rumo ao sucesso.',
    rightDescription: 'Liderando projetos inovadores com empatia e visão.',
    image: teamLeaderImage,
  }
];

// Animação orbital levemente inclinada
const orbitAnimation = keyframes`
  from {
    transform: rotate(0deg) translateX(300px) rotate(0deg);
  }
  to {
    transform: rotate(-360deg) translateX(300px) rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Hero: React.FC = () => {
  const [selectedFacet, setSelectedFacet] = useState<Facet | null>(null);

  const handleFacetClick = (facet: Facet) => {
    setSelectedFacet(facet);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '45vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#D9D9D9',
        overflow: 'hidden',
        perspective: '1000px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '800px',
          height: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(5deg)',
        }}
      >
        {/* Palavras orbitando */}
        {!selectedFacet && facets.map((facet, index) => (
          <Typography
            key={facet.id}
            onClick={() => handleFacetClick(facet)}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              color: '#000000',
              cursor: 'pointer',
              fontFamily: 'Michroma, sans-serif',
              fontSize: '1.2rem',
              padding: '10px',
              whiteSpace: 'nowrap',
              transformOrigin: '0 0',
              animation: `${orbitAnimation} 20s linear infinite`,
              animationDelay: `${-index * (20 / facets.length)}s`,
              transform: 'translate(-50%, -50%)',
              '&:hover': {
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                scale: 1.1,
              },
              '& > span': {
                display: 'inline-block',
                transform: 'rotateX(-5deg)',
              }
            }}
          >
            <span>{facet.rightTitle || facet.leftTitle}</span>
          </Typography>
        ))}

        {/* Conteúdo quando uma faceta está selecionada */}
        {selectedFacet ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              px: 4,
            }}
          >
            {/* Texto da esquerda */}
            <Box
              sx={{
                flex: '1',
                maxWidth: '250px',
                animation: `${slideInLeft} 0.5s ease forwards`,
                textAlign: 'right',
              }}
            >
              {selectedFacet.leftTitle && (
                <Typography
                  sx={{
                    fontFamily: 'Michroma, sans-serif',
                    fontSize: '2rem',
                    mb: 2,
                    color: '#000000',
                  }}
                >
                  {selectedFacet.leftTitle}
                </Typography>
              )}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#000000',
                }}
              >
                {selectedFacet.leftDescription}
              </Typography>
            </Box>

            {/* Container da imagem circular - Agora clicável */}
            <Box
              onClick={() => setSelectedFacet(null)}
              sx={{
                position: 'relative',
                width: 320,
                height: 320,
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  border: '3px solid #000000',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <img
                    src={selectedFacet.image}
                    alt={selectedFacet.rightTitle || selectedFacet.leftTitle || ''}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Texto da direita */}
            <Box
              sx={{
                flex: '1',
                maxWidth: '250px',
                animation: `${slideInRight} 0.5s ease forwards`,
              }}
            >
              {selectedFacet.rightTitle && (
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'Michroma, sans-serif',
                    fontSize: '2rem',
                    mb: 2,
                    color: '#000000',
                  }}
                >
                  {selectedFacet.rightTitle}
                </Typography>
              )}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#000000',
                }}
              >
                {selectedFacet.rightDescription}
              </Typography>
            </Box>
          </Box>
        ) : (
          // Avatar inicial
          <Box
            sx={{
              position: 'relative',
              width: 320,
              height: 320,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #000000',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={avatarImage}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Hero;