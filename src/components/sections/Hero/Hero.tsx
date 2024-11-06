import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

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
    rightTitle: 'Desenvolvimento de Software',
    leftDescription: 'Arquitetando soluções elegantes e eficientes.',
    rightDescription: 'Desenvolvendo soluções criativas com código.',
    image: devImage,
  },
  {
    id: 'dungeon-master',
    leftTitle: null,
    rightTitle: 'RPG',
    leftDescription: 'Criando mundos fantásticos e histórias memoráveis.',
    rightDescription: 'Guiando aventureiros em jornadas épicas.',
    image: dungeonMasterImage,
  },
  {
    id: 'forest-farmer',
    leftTitle: null,
    rightTitle: 'Agrofloresta',
    leftDescription: 'Cultivando consciência ambiental.',
    rightDescription: 'Promovendo sustentabilidade e conexão com a natureza.',
    image: forestFarmerImage,
  },
  {
    id: 'team-leader',
    leftTitle: null,
    rightTitle: 'Liderança',
    leftDescription: 'Guiando equipes rumo ao sucesso.',
    rightDescription: 'Liderando projetos inovadores com empatia e visão.',
    image: teamLeaderImage,
  }
];

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
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef(0);
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  const calculateAngle = (clientX: number, clientY: number): number => {
    if (!containerRef.current) return 0;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    startAngleRef.current = calculateAngle(clientX, clientY);
    lastAngleRef.current = startAngleRef.current;
    lastTimeRef.current = Date.now();
    cancelAnimationFrame(animationFrameRef.current!);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const currentAngle = calculateAngle(clientX, clientY);
    const angleDiff = currentAngle - lastAngleRef.current;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTimeRef.current;
    
    // Calcula a velocidade do movimento
    const newVelocity = angleDiff / timeDiff;
    setVelocity(newVelocity);
    
    setRotation(prev => prev + angleDiff);
    lastAngleRef.current = currentAngle;
    lastTimeRef.current = currentTime;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Inicia a animação de inércia
    const animate = () => {
      setVelocity(prev => prev * 0.95); // Decaimento da velocidade
      setRotation(prev => prev + velocity * 16); // 16ms é aproximadamente um frame a 60fps
      
      if (Math.abs(velocity) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (Math.abs(velocity) > 0.01) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const handleGlobalEnd = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchend', handleGlobalEnd);
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, [isDragging, velocity]);

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
          width: '800px',
          height: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none', // Previne scroll em dispositivos touch
        }}
      >
        {/* Avatar central */}
        <Box
          sx={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #000000',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
            bgcolor: '#000000',
            zIndex: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: selectedFacet ? 'none' : 'block',
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

        {/* Facets orbitando */}
        {!selectedFacet && facets.map((facet, index) => (
          <Typography
            key={facet.id}
            onClick={() => !isDragging && setSelectedFacet(facet)}
            sx={{
              position: 'absolute',
              top: '55%',
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
              animationDelay: `${-index * (20 / facets.length)}s`,
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
            {facet.rightTitle || facet.leftTitle}
          </Typography>
        ))}

        {/* Conteúdo selecionado */}
        {selectedFacet && (
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

            {/* Imagem central */}
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
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #000000',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                <img
                  src={selectedFacet.image}
                  alt={selectedFacet.rightTitle || selectedFacet.leftTitle || ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
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
        )}
      </Box>
    </Box>
  );
};

export default Hero;