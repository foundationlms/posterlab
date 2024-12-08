import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PosterTemplate } from '../types/poster';

export interface ExportConfig {
  format: 'pdf' | 'png';
  dpi: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const validateExportConfig = (template: PosterTemplate, config: ExportConfig): string[] => {
  const warnings: string[] = [];

  if (config.dpi < 150) {
    warnings.push('DPI is below recommended minimum (150). Print quality may be poor.');
  }
  if (config.dpi > 600) {
    warnings.push('Very high DPI may result in large file size and slow processing.');
  }

  return warnings;
};

export const getDefaultExportConfig = (template: PosterTemplate): ExportConfig => ({
  format: 'pdf',
  dpi: 300,
  margins: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }
});

export const exportPoster = async (
  container: HTMLElement,
  template: PosterTemplate,
  config: ExportConfig
): Promise<void> => {
  const scale = config.dpi / 96; // Convert DPI to scale factor
  
  const canvas = await html2canvas(container, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff'
  });

  if (config.format === 'pdf') {
    const pdf = new jsPDF({
      orientation: template.orientation,
      unit: 'mm'
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(
      imgData,
      'JPEG',
      config.margins.left,
      config.margins.top,
      pdfWidth - config.margins.left - config.margins.right,
      pdfHeight - config.margins.top - config.margins.bottom
    );

    pdf.save('poster.pdf');
  } else {
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
};