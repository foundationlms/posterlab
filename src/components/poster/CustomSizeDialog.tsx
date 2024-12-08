import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface CustomSizeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (width: number, height: number) => void;
}

const CustomSizeDialog: React.FC<CustomSizeDialogProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [width, setWidth] = useState('48');
  const [height, setHeight] = useState('36');
  const [unit, setUnit] = useState<'inches' | 'mm'>('inches');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(width);
    const h = parseFloat(height);
    
    if (isNaN(w) || isNaN(h)) return;

    // Convert to pixels at 300 DPI
    const pixelWidth = unit === 'inches' ? w * 300 : (w / 25.4) * 300;
    const pixelHeight = unit === 'inches' ? h * 300 : (h / 25.4) * 300;

    onConfirm(Math.round(pixelWidth), Math.round(pixelHeight));
    onClose();
  };

  const handleOrientationChange = (newOrientation: 'portrait' | 'landscape') => {
    if (newOrientation !== orientation) {
      // Swap width and height
      const tempWidth = width;
      setWidth(height);
      setHeight(tempWidth);
      setOrientation(newOrientation);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <Ruler className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Custom Poster Size
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Enter your desired poster dimensions
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Orientation Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orientation
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleOrientationChange('landscape')}
                  className={`relative aspect-video border-2 rounded-lg p-4 flex items-center justify-center focus:outline-none ${
                    orientation === 'landscape'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  <div className="w-full">
                    <div className="bg-white border border-gray-200 shadow-sm rounded w-full aspect-[4/3]">
                      <div className="w-full h-2 bg-indigo-100 rounded-t" />
                      <div className="p-1 grid grid-cols-3 grid-rows-2 gap-0.5">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="bg-gray-100 rounded" />
                        ))}
                      </div>
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-600">
                      Landscape
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleOrientationChange('portrait')}
                  className={`relative aspect-video border-2 rounded-lg p-4 flex items-center justify-center focus:outline-none ${
                    orientation === 'portrait'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  <div className="h-full">
                    <div className="bg-white border border-gray-200 shadow-sm rounded h-24 aspect-[3/4]">
                      <div className="w-full h-2 bg-indigo-100 rounded-t" />
                      <div className="p-1 grid grid-cols-2 grid-rows-3 gap-0.5">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="bg-gray-100 rounded" />
                        ))}
                      </div>
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-600">
                      Portrait
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                    Width
                  </label>
                  <input
                    type="number"
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    min="1"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="1"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Unit Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setUnit('inches')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    unit === 'inches'
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-500 z-10'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Inches
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('mm')}
                  className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    unit === 'mm'
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-500 z-10'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Millimeters
                </button>
              </div>
            </div>

            <div className="mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Create Poster
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomSizeDialog;