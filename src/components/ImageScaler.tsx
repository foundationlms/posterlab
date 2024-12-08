import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Lock, Unlock } from 'lucide-react';
import { ImageDimensions } from '../utils/imageHandler';

interface ImageScalerProps {
  originalDimensions: ImageDimensions;
  maxDimensions?: ImageDimensions;
  onScale: (dimensions: ImageDimensions) => void;
}

const ImageScaler: React.FC<ImageScalerProps> = ({
  originalDimensions,
  maxDimensions,
  onScale
}) => {
  const [width, setWidth] = useState(originalDimensions.width);
  const [height, setHeight] = useState(originalDimensions.height);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [scale, setScale] = useState(100);

  useEffect(() => {
    const aspectRatio = originalDimensions.width / originalDimensions.height;
    
    if (maintainAspectRatio) {
      if (width !== originalDimensions.width) {
        setHeight(Math.round(width / aspectRatio));
      } else if (height !== originalDimensions.height) {
        setWidth(Math.round(height * aspectRatio));
      }
    }

    const newScale = (width / originalDimensions.width) * 100;
    setScale(Math.round(newScale));

    onScale({ width, height, aspectRatio });
  }, [width, height, maintainAspectRatio]);

  const handleScaleChange = (newScale: number) => {
    const scaleFactor = newScale / 100;
    setWidth(Math.round(originalDimensions.width * scaleFactor));
    setHeight(Math.round(originalDimensions.height * scaleFactor));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Dimensions</span>
        <button
          onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
          className="p-1 rounded-full hover:bg-gray-100"
          title={maintainAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
        >
          {maintainAspectRatio ? (
            <Lock className="h-4 w-4" />
          ) : (
            <Unlock className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            min={1}
            max={maxDimensions?.width}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min={1}
            max={maxDimensions?.height}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Scale</label>
        <div className="mt-1 flex items-center space-x-2">
          <button
            onClick={() => handleScaleChange(scale - 10)}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={scale <= 10}
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <input
            type="range"
            min="10"
            max="200"
            value={scale}
            onChange={(e) => handleScaleChange(Number(e.target.value))}
            className="flex-1"
          />
          <button
            onClick={() => handleScaleChange(scale + 10)}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={scale >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-500 w-16 text-right">
            {scale}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageScaler;