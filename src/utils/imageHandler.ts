import { ImageDimensions } from '../types/poster';

export const validateImage = async (
  file: File,
  minDpi = 300,
  maxFileSize = 10 * 1024 * 1024 // 10MB
): Promise<string[]> => {
  const warnings: string[] = [];

  // Check file size
  if (file.size > maxFileSize) {
    warnings.push(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
  }

  // Check image dimensions and DPI
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
  } finally {
    URL.revokeObjectURL(url);
  }

  return warnings;
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

export const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> => {
  const img = new Image();
  const url = URL.createObjectURL(file);

  try {
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    let { width, height } = img;

    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, file.type);
    });
  } finally {
    URL.revokeObjectURL(url);
  }
};