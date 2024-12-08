import React, { useState } from 'react';
import { Download, AlertTriangle } from 'lucide-react';
import { PosterTemplate } from '../types/poster';
import { exportPoster, validateExportSettings, getRecommendedSettings } from '../utils/pdfExport';
import ExportDialog from './ExportDialog';

interface ExportButtonProps {
  containerRef: React.RefObject<HTMLElement>;
  template: PosterTemplate;
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  containerRef,
  template,
  disabled = false
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (options: ExportOptions) => {
    if (!containerRef.current) return;

    setIsExporting(true);
    setError(null);

    try {
      await exportPoster(containerRef.current, template, options);
      setShowDialog(false);
    } catch (err) {
      setError('Failed to export poster. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        disabled={disabled || isExporting}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <Download className="h-4 w-4 mr-2" />
        {isExporting ? 'Exporting...' : 'Export'}
      </button>

      <ExportDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onExport={handleExport}
        template={template}
        initialConfig={getRecommendedSettings(template)}
      />

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
          {error}
        </div>
      )}
    </>
  );
};

export default ExportButton;