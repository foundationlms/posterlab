import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Settings2, QrCode } from 'lucide-react';

interface QRCodeSectionProps {
  url: string;
  size?: number;
  onSizeChange?: (size: number) => void;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  url,
  size = 128,
  onSizeChange
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative group">
      <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="flex items-center space-x-2 text-gray-500">
          <QrCode className="h-5 w-5" />
          <span className="text-sm font-medium">Scan to view online</span>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <QRCodeSVG
            value={url}
            size={size}
            level="H"
            includeMargin
            className="rounded"
          />
        </div>
        
        {onSizeChange && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <Settings2 className="h-4 w-4 text-gray-600" />
          </button>
        )}

        {showSettings && onSizeChange && (
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-4 z-10 w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Size
            </label>
            <input
              type="range"
              min="64"
              max="256"
              step="8"
              value={size}
              onChange={(e) => onSizeChange(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="text-xs text-gray-500 mt-2 text-center">
              {size}px × {size}px
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeSection;