import { useState } from 'react';
import { PosterElement } from '../types/poster';

export const usePosterContent = () => {
  const [elements, setElements] = useState<Record<string, PosterElement>>({});

  const updateElement = (sectionId: string, content: any) => {
    setElements(prev => ({
      ...prev,
      [sectionId]: content
    }));
  };

  const removeElement = (sectionId: string) => {
    setElements(prev => {
      const newElements = { ...prev };
      delete newElements[sectionId];
      return newElements;
    });
  };

  return {
    elements,
    updateElement,
    removeElement,
    setElements
  };
};