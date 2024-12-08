import { PosterSection } from '../types/poster';

export interface ContentDimensions {
  width: number;
  height: number;
}

export const calculateOptimalFontSize = (
  container: HTMLElement,
  minSize = 12,
  maxSize = 72,
  lineHeight = 1.2
): number => {
  const content = container.textContent || '';
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  let low = minSize;
  let high = maxSize;
  let optimal = minSize;

  const tempDiv = document.createElement('div');
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.position = 'absolute';
  tempDiv.style.width = `${containerWidth}px`;
  tempDiv.style.whiteSpace = 'pre-wrap';
  tempDiv.style.lineHeight = lineHeight.toString();
  document.body.appendChild(tempDiv);

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    tempDiv.style.fontSize = `${mid}px`;
    tempDiv.textContent = content;

    if (tempDiv.offsetHeight <= containerHeight) {
      optimal = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  document.body.removeChild(tempDiv);
  return optimal;
};

export const scaleImage = (
  img: HTMLImageElement,
  container: ContentDimensions,
  preserveAspectRatio = true
): { width: number; height: number } => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const containerRatio = container.width / container.height;

  let width = container.width;
  let height = container.height;

  if (preserveAspectRatio) {
    if (imgRatio > containerRatio) {
      height = width / imgRatio;
    } else {
      width = height * imgRatio;
    }
  }

  return { width, height };
};

export const getOptimalContentSize = (
  section: PosterSection,
  container: HTMLElement
): { fontSize: number; lineHeight: number } => {
  const minFontSize = section.minFontSize || 12;
  const maxFontSize = section.maxFontSize || 72;
  
  // Different scaling for different section types
  switch (section.type) {
    case 'header':
      return {
        fontSize: Math.max(minFontSize, Math.min(maxFontSize, container.clientWidth / 20)),
        lineHeight: 1.4
      };
    case 'text':
    case 'methods':
    case 'results':
      return {
        fontSize: Math.max(minFontSize, Math.min(maxFontSize, container.clientWidth / 30)),
        lineHeight: 1.5
      };
    case 'references':
      return {
        fontSize: Math.max(minFontSize, Math.min(maxFontSize, container.clientWidth / 40)),
        lineHeight: 1.3
      };
    default:
      return {
        fontSize: minFontSize,
        lineHeight: 1.4
      };
  }
};