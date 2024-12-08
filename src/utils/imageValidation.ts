import { ImageDimensions } from '../types/poster';

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export const validateImage = async (file: File, minDpi = 300): Promise<ValidationResult> => {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check file size (max 20MB)
  const maxSize = 20 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push(`File size exceeds 20MB limit (current: ${(file.size / 1024 / 1024).toFixed(1)}MB)`);
  }

  // Check dimensions and DPI
  const img = new Image();
  const url = URL.createObjectURL(file);

  try {
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const dpi = Math.min(img.naturalWidth, img.naturalHeight);
    if (dpi < minDpi) {
      warnings.push(`Image resolution is below ${minDpi} DPI, which may result in poor print quality`);
    }

    // Check dimensions
    if (img.naturalWidth < 1000 || img.naturalHeight < 1000) {
      warnings.push('Image dimensions are relatively small for a poster');
    }

  } finally {
    URL.revokeObjectURL(url);
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors
  };
};

export const getImageDimensions = (file: File): Promise<ImageDimensions> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    
    img.src = url;
  });
};