import React from 'react';
import { Palette, Type } from 'lucide-react';

interface StylePanelProps {
  styles: {
    fontFamily: string;
    titleColor: string;
    headingColor: string;
    textColor: string;
    backgroundColor: string;
    accentColor: string;
  };
  onStyleChange: (styles: Partial<StylePanelProps['styles']>) => void;
}

const StylePanel: React.FC<StylePanelProps> = ({ styles, onStyleChange }) => {
  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' },
    { name: 'IBM Plex Sans', value: 'IBM Plex Sans, sans-serif' }
  ];

  const colorSchemes = [
    {
      name: 'Professional',
      colors: {
        titleColor: '#1a365d',
        headingColor: '#2d3748',
        textColor: '#4a5568',
        backgroundColor: '#ffffff',
        accentColor: '#3182ce'
      }
    },
    {
      name: 'Modern',
      colors: {
        titleColor: '#000000',
        headingColor: '#1a202c',
        textColor: '#2d3748',
        backgroundColor: '#f7fafc',
        accentColor: '#667eea'
      }
    },
    {
      name: 'Classic',
      colors: {
        titleColor: '#2c5282',
        headingColor: '#2a4365',
        textColor: '#2d3748',
        backgroundColor: '#ebf8ff',
        accentColor: '#4299e1'
      }
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Typography */}
      <div>
        <h3 className="flex items-center text-sm font-medium text-gray-900 mb-4">
          <Type className="h-4 w-4 mr-2" />
          Typography
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Family
          </label>
          <select
            value={styles.fontFamily}
            onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="flex items-center text-sm font-medium text-gray-900 mb-4">
          <Palette className="h-4 w-4 mr-2" />
          Colors
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title Color
            </label>
            <input
              type="color"
              value={styles.titleColor}
              onChange={(e) => onStyleChange({ titleColor: e.target.value })}
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading Color
            </label>
            <input
              type="color"
              value={styles.headingColor}
              onChange={(e) => onStyleChange({ headingColor: e.target.value })}
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={styles.textColor}
              onChange={(e) => onStyleChange({ textColor: e.target.value })}
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={styles.backgroundColor}
              onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accent Color
            </label>
            <input
              type="color"
              value={styles.accentColor}
              onChange={(e) => onStyleChange({ accentColor: e.target.value })}
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Color Schemes */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Color Schemes
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.name}
              onClick={() => onStyleChange(scheme.colors)}
              className="p-3 border rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="flex flex-col items-center">
                <div className="flex space-x-1 mb-2">
                  {Object.values(scheme.colors).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {scheme.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylePanel;