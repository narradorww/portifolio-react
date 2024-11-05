import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const SpeechBalloonIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 1000 800">
    <path d="M950 350c0 180-200 325-450 325-50 0-98-4-143-12l-240 112c-12 6-25-6-20-18l75-139C89 564 50 491 50 350c0-180 200-325 450-325s450 145 450 325z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="20"
    />
  </SvgIcon>
);

export default SpeechBalloonIcon;