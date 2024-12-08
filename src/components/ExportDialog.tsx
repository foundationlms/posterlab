import React, { useState } from 'react';
import { X, Download, AlertTriangle } from 'lucide-react';
import { PosterTemplate } from '../types/poster';
import { DimensionConfig, validateDimensions, standardSizes } from '../utils/posterDimensions';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: DimensionConfig) => void;
  template: PosterTemplate;
}

const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  onExport,
  template
}) => {
  const [config, setConfig] = useState<DimensionConfig>({
    width: standardSizes.A0.width,
    height: standardSizes.A0.height,
    dpi: 300,
    margins: { top: 10, right: 10, bottom: 10, left: 10 }
  });
  const [warnings, setWarnings] = useState<string[]>([]);

  const handleExport = () => {
    const newWarnings = validateDimensions(template, config);
    setWarnings(newWarnings);
    
    if (newWarnings.length === 0 || window.confirm('Proceed with warnings?')) {
      onExport(config);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Export Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure your poster export settings</p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Poster Size</label>
              <select
                value={`${config.width}x${config.height}`}
                onChange={(e) => {
                  const [width, height] = e.target.value.split('x').map(Number);
                  setConfig({ ...config, width, height });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={`${standardSizes.A0.width}x${standardSizes.A0.height}`}>A0 (841 × 1189 mm)</option>
                <option value={`${standardSizes.A1.width}x${standardSizes.A1.height}`}>A1 (594 × 841 mm)</option>
                <option value={`${standardSizes.custom48x36.width}x${standardSizes.custom48x36.height}`}>48" × 36"</option>
                <option value={`${standardSizes.custom36x48.width}x${standardSizes.custom36x48.height}`}>36" × 48"</option>
              </select>
            </div>

            {/* DPI Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Resolution (DPI)</label>
              <select
                value={config.dpi}
                onChange={(e) => setConfig({ ...config, dpi: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="150">150 DPI (Draft)</option>
                <option value="300">300 DPI (Standard)</option>
                <option value="600">600 DPI (High Quality)</option>
              </select>
            </div>

            {/* Margins */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Margins (mm)</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">Top</label>
                  <input
                    type="number"
                    value={config.margins.top}
                    onChange={(e) => setConfig({
                      ...config,
                      margins: { ...config.margins, top: Number(e.target.value) }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Right</label>
                  <input
                    type="number"
                    value={config.margins.right}
                    onChange={(e) => setConfig({
                      ...config,
                      margins: { ...config.margins, right: Number(e.target.value) }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Bottom</label>
                  <input
                    type="number"
                    value={config.margins.bottom}
                    onChange={(e) => setConfig({
                      ...config,
                      margins: { ...config.margins, bottom: Number(e.target.value) }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Left</label>
                  <input
                    type="number"
                    value={config.margins.left}
                    onChange={(e) => setConfig({
                      ...config,
                      margins: { ...config.margins, left: Number(e.target.value) }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Export Warnings</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleExport}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;