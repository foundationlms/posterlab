import { PosterData } from '../types/poster';

export const savePosterToStorage = (poster: PosterData): void => {
  try {
    // Get existing posters
    const storedPosters = localStorage.getItem('posters');
    const posters: PosterData[] = storedPosters ? JSON.parse(storedPosters) : [];
    
    // Update existing poster or add new one
    const existingIndex = posters.findIndex(p => p.id === poster.id);
    if (existingIndex >= 0) {
      posters[existingIndex] = poster;
    } else {
      posters.push(poster);
    }
    
    // Save back to storage
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