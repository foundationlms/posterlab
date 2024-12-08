import { useState } from 'react';

interface PosterStyles {
  fontFamily: string;
  titleColor: string;
  textColor: string;
  backgroundColor: string;
}

const defaultStyles: PosterStyles = {
  fontFamily: 'Inter, sans-serif',
  titleColor: '#1a365d',
  textColor: '#4a5568',
  backgroundColor: '#ffffff'
};

export const usePosterStyles = (initialStyles: Partial<PosterStyles> = {}) => {
  const [styles, setStyles] = useState<PosterStyles>({
    ...defaultStyles,
    ...initialStyles
  });

  const updateStyles = (newStyles: Partial<PosterStyles>) => {
    setStyles(prev => ({
      ...prev,
      ...newStyles
    }));
  };

  return {
    styles,
    updateStyles
  };
};