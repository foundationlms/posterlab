import React from 'react';
import { Layout, Palette, Save, Share2, Download } from 'lucide-react';

interface BuilderToolbarProps {
  onChangeTemplate: () => void;
  onToggleStyles: () => void;
  showStylePanel: boolean;
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
}

const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  onChangeTemplate,
  onToggleStyles,
  showStylePanel,
  onSave,
  onShare,
  onExport
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onChangeTemplate}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Layout className="h-4 w-4 mr-1.5" />
            Change Template
          </button>
          <button
            onClick={onToggleStyles}
            className={`inline-flex items-center px-3 py-1.5 border rounded text-sm font-medium ${
              showStylePanel
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Palette className="h-4 w-4 mr-1.5" />
            Styles
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onSave}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <Save className="h-4 w-4 mr-1.5" />
            Save
          </button>
          <button
            onClick={onShare}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </button>
          <button
            onClick={onExport}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderToolbar;