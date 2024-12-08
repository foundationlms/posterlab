import { PosterElement, PosterSection } from '../types/poster';

export interface ValidationWarning {
  type: 'overflow' | 'empty' | 'imageQuality' | 'textSize';
  message: string;
  severity: 'info' | 'warning' | 'error';
  elementId?: string;
  sectionId?: string;
}

export const validateSection = (
  section: PosterSection,
  elements: PosterElement[],
  containerWidth: number,
  containerHeight: number
): ValidationWarning[] => {
  const warnings: ValidationWarning[] = [];
  const sectionElements = elements.filter(el => el.sectionId === section.id);

  // Check for empty required sections
  if (section.required && sectionElements.length === 0) {
    warnings.push({
      type: 'empty',
      message: `${section.name} is required but empty`,
      severity: 'error',
      sectionId: section.id
    });
  }

  // Check content overflow
  sectionElements.forEach(element => {
    const elementHeight = calculateElementHeight(element, containerWidth);
    if (elementHeight > containerHeight) {
      warnings.push({
        type: 'overflow',
        message: `Content in ${section.name} exceeds section boundaries`,
        severity: 'warning',
        elementId: element.id,
        sectionId: section.id
      });
    }
  });

  return warnings;
};

export const calculateElementHeight = (element: PosterElement, containerWidth: number): number => {
  const tempDiv = document.createElement('div');
  tempDiv.style.width = `${containerWidth}px`;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.innerHTML = element.content;
  
  document.body.appendChild(tempDiv);
  const height = tempDiv.offsetHeight;
  document.body.removeChild(tempDiv);
  
  return height;
};

export const calculateOptimalFontSize = (
  text: string,
  containerWidth: number,
  containerHeight: number,
  minSize = 12,
  maxSize = 72
): number => {
  let low = minSize;
  let high = maxSize;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const tempDiv = document.createElement('div');
    tempDiv.style.width = `${containerWidth}px`;
    tempDiv.style.fontSize = `${mid}px`;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.textContent = text;
    
    document.body.appendChild(tempDiv);
    const fits = tempDiv.offsetHeight <= containerHeight;
    document.body.removeChild(tempDiv);
    
    if (fits) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  return high;
};

export const validateImageResolution = (
  imageUrl: string,
  minDpi = 150
): Promise<ValidationWarning[]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const warnings: ValidationWarning[] = [];
      const dpi = Math.min(img.naturalWidth, img.naturalHeight);
      
      if (dpi < minDpi) {
        warnings.push({
          type: 'imageQuality',
          message: `Image resolution may be too low for print quality (recommended: ${minDpi}DPI)`,
          severity: 'warning'
        });
      }
      
      resolve(warnings);
    };
    img.src = imageUrl;
  });
};