import { PosterData, PosterTemplate, PosterElement } from '../types/poster';
import { savePosterToStorage, getStoredPosters } from '../utils/posterStorage';

export class PosterService {
  async savePoster(poster: PosterData): Promise<void> {
    try {
      await savePosterToStorage(poster);
    } catch (error) {
      console.error('Failed to save poster:', error);
      throw new Error('Failed to save poster');
    }
  }

  async loadPosters(): Promise<PosterData[]> {
    try {
      return getStoredPosters();
    } catch (error) {
      console.error('Failed to load posters:', error);
      return [];
    }
  }

  async exportPoster(container: HTMLElement): Promise<void> {
    try {
      const { exportPoster } = await import('../utils/pdfExport');
      await exportPoster(container);
    } catch (error) {
      console.error('Failed to export poster:', error);
      throw new Error('Failed to export poster');
    }
  }

  validatePoster(template: PosterTemplate, elements: Record<string, PosterElement>): string[] {
    const errors: string[] = [];

    // Validate required sections
    template.sections
      .filter(section => section.required)
      .forEach(section => {
        if (!elements[section.id]) {
          errors.push(`${section.name} is required but empty`);
        }
      });

    return errors;
  }
}

export const posterService = new PosterService();