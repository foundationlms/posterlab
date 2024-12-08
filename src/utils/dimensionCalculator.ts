export interface Dimensions {
  width: number;
  height: number;
  unit: 'mm' | 'px' | 'in';
}

export const CONVERSION_FACTORS = {
  'mm_to_px': (dpi: number) => dpi / 25.4,
  'in_to_px': (dpi: number) => dpi,
  'px_to_mm': (dpi: number) => 25.4 / dpi,
  'px_to_in': (dpi: number) => 1 / dpi,
  'mm_to_in': () => 1 / 25.4,
  'in_to_mm': () => 25.4
};

export const convertDimensions = (
  dimensions: Dimensions,
  targetUnit: 'mm' | 'px' | 'in',
  dpi: number = 300
): Dimensions => {
  if (dimensions.unit === targetUnit) {
    return dimensions;
  }

  const conversionKey = `${dimensions.unit}_to_${targetUnit}`;
  const factor = CONVERSION_FACTORS[conversionKey](dpi);

  return {
    width: Math.round(dimensions.width * factor),
    height: Math.round(dimensions.height * factor),
    unit: targetUnit
  };
};

export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

export const maintainAspectRatio = (
  width: number,
  height: number,
  targetWidth?: number,
  targetHeight?: number
): { width: number; height: number } => {
  const aspectRatio = calculateAspectRatio(width, height);

  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio)
    };
  }

  if (targetHeight && !targetWidth) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight
    };
  }

  return { width, height };
};

export const fitDimensionsToContainer = (
  dimensions: Dimensions,
  containerDimensions: Dimensions,
  maintainRatio: boolean = true
): Dimensions => {
  if (dimensions.unit !== containerDimensions.unit) {
    throw new Error('Dimensions must be in the same unit');
  }

  const containerRatio = calculateAspectRatio(
    containerDimensions.width,
    containerDimensions.height
  );
  const dimensionsRatio = calculateAspectRatio(dimensions.width, dimensions.height);

  let newWidth = dimensions.width;
  let newHeight = dimensions.height;

  if (maintainRatio) {
    if (dimensionsRatio > containerRatio) {
      newWidth = containerDimensions.width;
      newHeight = Math.round(containerDimensions.width / dimensionsRatio);
    } else {
      newHeight = containerDimensions.height;
      newWidth = Math.round(containerDimensions.height * dimensionsRatio);
    }
  } else {
    newWidth = Math.min(dimensions.width, containerDimensions.width);
    newHeight = Math.min(dimensions.height, containerDimensions.height);
  }

  return {
    width: newWidth,
    height: newHeight,
    unit: dimensions.unit
  };
};