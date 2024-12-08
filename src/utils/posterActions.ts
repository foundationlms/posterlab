import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PosterData } from '../types/poster';

export const savePosterToStorage = async (poster: PosterData): Promise<void> => {
  try {
    const storedPosters = localStorage.getItem('posters');
    const posters: PosterData[] = storedPosters ? JSON.parse(storedPosters) : [];
    
    const existingIndex = posters.findIndex(p => p.id === poster.id);
    
    if (existingIndex >= 0) {
      posters[existingIndex] = {
        ...posters[existingIndex],
        ...poster,
        lastModified: new Date().toISOString()
      };
    } else {
      posters.push({
        ...poster,
        lastModified: new Date().toISOString()
      });
    }
    
    localStorage.setItem('posters', JSON.stringify(posters));
  } catch (error) {
    console.error('Failed to save poster:', error);
    throw new Error('Failed to save poster');
  }
};

export const getStoredPosters = (): PosterData[] => {
  try {
    const storedPosters = localStorage.getItem('posters');
    return storedPosters ? JSON.parse(storedPosters) : [];
  } catch (error) {
    console.error('Failed to get posters:', error);
    return [];
  }
};

export const deletePoster = (posterId: string): void => {
  try {
    const storedPosters = localStorage.getItem('posters');
    const posters: PosterData[] = storedPosters ? JSON.parse(storedPosters) : [];
    const updatedPosters = posters.filter(p => p.id !== posterId);
    localStorage.setItem('posters', JSON.stringify(updatedPosters));
  } catch (error) {
    console.error('Failed to delete poster:', error);
    throw new Error('Failed to delete poster');
  }
};

export const exportPoster = async (container: HTMLElement): Promise<void> => {
  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure all images are loaded in the cloned document
        const images = clonedDoc.getElementsByTagName('img');
        return Promise.all(Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }));
      }
    });

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('poster.pdf');

  } catch (error) {
    console.error('Error exporting poster:', error);
    throw new Error('Failed to export poster');
  }
};