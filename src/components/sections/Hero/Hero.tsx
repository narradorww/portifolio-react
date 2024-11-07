import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';

import avatarImage from '../../../assets/images/avatar.jpeg';
import devImage from '../../../assets/images/dev.png';
import dungeonMasterImage from '../../../assets/images/dungeon-master.png';
import forestFarmerImage from '../../../assets/images/forestfarmer.png';
import teamLeaderImage from '../../../assets/images/team-leader.png';
import iaInovatorImage from '../../../assets/images/Awards1.png';

type FacetId = 'dev' | 'dungeonMaster' | 'forestFarmer' | 'teamLeader' | 'iainovator';

interface Facet {
  id: FacetId;
  image: string;
}

const facets: readonly Facet[] = [
  { id: 'dev', image: devImage },
  { id: 'dungeonMaster', image: dungeonMasterImage },
  { id: 'forestFarmer', image: forestFarmerImage },
  { id: 'teamLeader', image: teamLeaderImage },
  { id: 'iainovator', image: iaInovatorImage}
] as const;

const orbitAnimation = keyframes`
  0% {
    left: 0%;
    z-index: 1;
    transform: translate(0%, -50%) scale(0.7);
    color: #000000;
  }
  25% {
    transform: translate(-100%, -50%) scale(0.3);
    color: #333333;
  }
  45% {
    color: #666666;
  }
  50% {
    left: 100%;
    z-index: 1;
    transform: translate(-100%, -50%) scale(0.3);
    color: #888888;
  }
  50.001% {
    z-index: 3;
    color: #999999;
  }
  65% {
    color: #CCCCCC;
  }
  75% {
    transform: translate(-100%, -50%) scale(1);
    color: #E6E6E6;
  }
  85% {
    color: #666666;
  }
  100% {
    left: 0%;
    z-index: 3;
    transform: translate(0%, -50%) scale(0.7);
    color: #000000;
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

const fadeImage = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFacet, setSelectedFacet] = useState<Facet | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef<number>(0);
  const lastAngleRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number>();

  const calculateAngle = (clientX: number, clientY: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startAngleRef.current = calculateAngle(clientX, clientY);
    lastAngleRef.current = startAngleRef.current;
    lastTimeRef.current = Date.now();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentAngle = calculateAngle(clientX, clientY);
    const angleDiff = currentAngle - lastAngleRef.current;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTimeRef.current;
    const newVelocity = angleDiff / timeDiff;
    setVelocity(newVelocity);
    setRotation(prev => prev + angleDiff);
    lastAngleRef.current = currentAngle;
    lastTimeRef.current = currentTime;
  };

  const handleDragEnd = (): void => {
    setIsDragging(false);
    const animate = (): void => {
      setVelocity(prev => prev * 0.95);
      setRotation(prev => prev + velocity * 16);
      if (Math.abs(velocity) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    if (Math.abs(velocity) > 0.01) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const handleGlobalEnd = (): void => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchend', handleGlobalEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, velocity]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '55vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#D9D9D9',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          pt: '5vh',
        }}
      >
        {selectedFacet ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              px: 4,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                pr: 4,
                animation: `${slideInLeft} 0.5s ease forwards`,
                minWidth: '420px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '2rem',
                  mb: 2,
                  color: '#000000',
                  textAlign: 'right',
                }}
              >
                {t(`hero.facets.${selectedFacet.id}.leftTitle`)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#000000',
                  textAlign: 'right',
                }}
              >
                {t(`hero.facets.${selectedFacet.id}.leftDescription`)}
              </Typography>
            </Box>

            <Box
              onClick={() => setSelectedFacet(null)}
              sx={{
                width: 320,
                height: 320,
                position: 'relative',
                cursor: 'pointer',
                flexShrink: 0,
                mx: 4,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #000000',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
                  bgcolor: '#F7DE9A',
                  transition: 'all 0.5s ease-in-out',
                  animation: `${fadeImage} 0.5s ease-in-out`,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <img
                  src={selectedFacet.image}
                  alt={t(`hero.facets.${selectedFacet.id}.rightTitle`)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                pl: 4,
                animation: `${slideInRight} 0.5s ease forwards`,
                minWidth: '420px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '2rem',
                  mb: 2,
                  color: '#000000',
                }}
              >
                {t(`hero.facets.${selectedFacet.id}.rightTitle`)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#000000',
                }}
              >
                {t(`hero.facets.${selectedFacet.id}.rightDescription`)}
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                width: 320,
                height: 320,
                position: 'relative',
                mb: 4,
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #000000',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
                  bgcolor: '#000000',
                  animation: `${fadeImage} 0.5s ease-in-out`,
                }}
              >
                <img
                  src={avatarImage}
                  alt={t('hero.avatar.alt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 1,
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                textAlign: 'center',
                animation: `${fadeIn} 1s ease forwards`,
                maxWidth: '600px',
                zIndex: 2,
                mt: 0,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '1.4rem',
                  color: '#000000',
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                {t('hero.greeting')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.1rem',
                  color: '#000000',
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                {t('hero.description')}
              </Typography>
            </Box>

            {facets.map((facet, index) => (
              <Typography
                key={facet.id}
                onClick={() => !isDragging && setSelectedFacet(facet)}
                sx={{
                  position: 'absolute',
                  top: '40%',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isDragging ? 'grabbing' : 'pointer',
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  animation: `${orbitAnimation} 16s infinite ease-in-out`,
                  animationDelay: `${-index * (16 / facets.length)}s`,
                  animationPlayState: isDragging ? 'paused' : 'running',
                  transform: isDragging ? `rotate(${rotation}deg)` : undefined,
                  transition: isDragging ? 'none' : 'all 0.3s ease',
                  userSelect: 'none',
                  '-webkit-user-select': 'none',
                  '&:hover': {
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    transform: 'scale(1.1)',
                    animationPlayState: 'paused'
                  }
                }}
              >
                {t(`hero.facets.${facet.id}.leftTitle`)}
              </Typography>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Hero;