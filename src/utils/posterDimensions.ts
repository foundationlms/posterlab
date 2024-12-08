import { PosterTemplate } from '../types/poster';

export interface DimensionConfig {
  width: number;
  height: number;
  dpi: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const standardSizes = {
  A0: { width: 841, height: 1189 }, // mm
  A1: { width: 594, height: 841 },
  custom48x36: { width: 1219.2, height: 914.4 }, // 48x36 inches in mm
  custom36x48: { width: 914.4, height: 1219.2 }
};

export const calculatePixelDimensions = (config: DimensionConfig): { width: number; height: number } => {
  const pxPerMm = config.dpi / 25.4; // Convert DPI to pixels per mm
  return {
    width: Math.round((config.width - config.margins.left - config.margins.right) * pxPerMm),
    height: Math.round((config.height - config.margins.top - config.margins.bottom) * pxPerMm)
  };
};

export const validateDimensions = (template: PosterTemplate, config: DimensionConfig) => {
  const warnings: string[] = [];
  const minDPI = 150;
  const maxDPI = 600;

  if (config.dpi < minDPI) {
    warnings.push(`DPI is below recommended minimum of ${minDPI}. Print quality may be poor.`);
  }
  if (config.dpi > maxDPI) {
    warnings.push(`DPI is above recommended maximum of ${maxDPI}. File size may be very large.`);
  }

  const { width, height } = calculatePixelDimensions(config);
  const aspectRatio = width / height;
  const templateAspectRatio = template.width / template.height;

  if (Math.abs(aspectRatio - templateAspectRatio) > 0.01) {
    warnings.push('Selected dimensions do not match template aspect ratio. Content may be distorted.');
  }

  return warnings;
};