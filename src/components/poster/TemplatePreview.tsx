import React from 'react';
import { Layout } from 'lucide-react';
import { PosterTemplate } from '../../types/poster';

interface TemplatePreviewProps {
  template: PosterTemplate;
  onSelect: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, onSelect }) => {
  // Only show orientation in the subtitle, omit the type
  const subtitle = template.orientation.charAt(0).toUpperCase() + template.orientation.slice(1);

  return (
    <button
      onClick={onSelect}
      className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-500 transition-all hover:shadow-lg bg-white group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <Layout className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              {template.name}
            </h3>
            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 grid gap-1 p-2" style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)'
        }}>
          {template.sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded shadow-sm border border-gray-100"
              style={{ gridArea: section.area }}
            >
              <div className="h-full w-full flex items-center justify-center text-[6px] text-gray-400 overflow-hidden">
                {section.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};

export default TemplatePreview;