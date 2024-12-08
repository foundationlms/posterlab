import { useState } from 'react';
import { PosterData, PosterTemplate, PosterElement } from '../types/poster';
import { posterService } from '../services/posterService';
import { usePosterContent } from './usePosterContent';
import { usePosterStyles } from './usePosterStyles';

export const usePosterOperations = (initialTemplate?: PosterTemplate) => {
  const [template, setTemplate] = useState<PosterTemplate | null>(initialTemplate || null);
  const { elements, updateElement, removeElement } = usePosterContent();
  const { styles, updateStyles } = usePosterStyles();
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savePoster = async () => {
    if (!template) return;

    setIsSaving(true);
    setError(null);

    try {
      const posterData: PosterData = {
        id: Math.random().toString(36).substr(2, 9),
        title: elements.title?.content || 'Untitled Poster',
        template,
        elements,
        styles,
        lastModified: new Date().toISOString()
      };

      const validationErrors = posterService.validatePoster(template, elements);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      await posterService.savePoster(posterData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save poster');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const exportPoster = async (container: HTMLElement) => {
    if (!template) return;

    setIsExporting(true);
    setError(null);

    try {
      await posterService.exportPoster(container);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export poster');
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    template,
    setTemplate,
    elements,
    updateElement,
    removeElement,
    styles,
    updateStyles,
    savePoster,
    exportPoster,
    isSaving,
    isExporting,
    error
  };
};