import React, { createContext, useContext, ReactNode } from 'react';
import { PosterTemplate, PosterElement } from '../types/poster';
import { usePosterOperations } from '../hooks/usePosterOperations';

interface PosterContextType {
  template: PosterTemplate | null;
  setTemplate: (template: PosterTemplate | null) => void;
  elements: Record<string, PosterElement>;
  updateElement: (sectionId: string, content: any) => void;
  removeElement: (sectionId: string) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
  };
  updateStyles: (styles: any) => void;
  savePoster: () => Promise<void>;
  exportPoster: (container: HTMLElement) => Promise<void>;
  isSaving: boolean;
  isExporting: boolean;
  error: string | null;
}

const PosterContext = createContext<PosterContextType | undefined>(undefined);

export const PosterProvider: React.FC<{
  children: ReactNode;
  initialTemplate?: PosterTemplate;
}> = ({ children, initialTemplate }) => {
  const posterOperations = usePosterOperations(initialTemplate);

  return (
    <PosterContext.Provider value={posterOperations}>
      {children}
    </PosterContext.Provider>
  );
};

export const usePoster = () => {
  const context = useContext(PosterContext);
  if (context === undefined) {
    throw new Error('usePoster must be used within a PosterProvider');
  }
  return context;
};