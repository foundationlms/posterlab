export interface TextDimensions {
  width: number;
  height: number;
}

export const calculateOptimalFontSize = (
  text: string,
  containerWidth: number,
  containerHeight: number,
  minSize = 12,
  maxSize = 72,
  lineHeight = 1.2
): number => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.width = `${containerWidth}px`;
  tempDiv.style.whiteSpace = 'pre-wrap';
  tempDiv.style.lineHeight = lineHeight.toString();
  tempDiv.textContent = text;
  document.body.appendChild(tempDiv);

  let low = minSize;
  let high = maxSize;
  let optimal = minSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    tempDiv.style.fontSize = `${mid}px`;

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

export const validateTextFit = (
  element: HTMLElement,
  container: TextDimensions
): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.height <= container.height && rect.width <= container.width;
};

export const adjustTextToFit = (
  element: HTMLElement,
  container: TextDimensions,
  minSize = 12,
  maxSize = 72
): void => {
  let fontSize = parseInt(window.getComputedStyle(element).fontSize);
  
  while (fontSize > minSize && !validateTextFit(element, container)) {
    fontSize--;
    element.style.fontSize = `${fontSize}px`;
  }
  
  while (fontSize < maxSize && validateTextFit(element, container)) {
    fontSize++;
    element.style.fontSize = `${fontSize}px`;
  }
  
  // Step back one size to ensure fit
  element.style.fontSize = `${fontSize - 1}px`;
};