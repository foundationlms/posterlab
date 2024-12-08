import React from 'react';
import { Layout, Maximize2 } from 'lucide-react';
import { PosterTemplate } from '../types/poster';

interface PosterTemplatesProps {
  onSelectTemplate: (template: PosterTemplate) => void;
  onCustomSize: () => void;
}

const templates: PosterTemplate[] = [
  {
    id: 'modern-portrait',
    name: 'Modern Portrait',
    type: 'modern',
    width: 10800,
    height: 14400,
    orientation: 'portrait',
    sections: [
      {
        id: 'title',
        name: 'Title & Authors',
        area: '1/1/3/13',
        placeholder: 'Enter title, authors, and affiliations',
        type: 'text',
        required: true,
        minFontSize: 32,
        maxFontSize: 48
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/2/4/12',
        placeholder: 'Research summary',
        type: 'text',
        minFontSize: 18,
        maxFontSize: 24
      },
      {
        id: 'main-figure',
        name: 'Main Figure',
        area: '4/1/7/13',
        placeholder: 'Key visualization',
        type: 'figure',
        minFontSize: 14,
        maxFontSize: 18
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '7/1/9/7',
        placeholder: 'Methodology',
        type: 'methods',
        minFontSize: 14,
        maxFontSize: 18
      },
      {
        id: 'results',
        name: 'Results',
        area: '7/7/9/13',
        placeholder: 'Key findings',
        type: 'results',
        minFontSize: 14,
        maxFontSize: 18
      },
      {
        id: 'references',
        name: 'References',
        area: '9/1/10/13',
        placeholder: 'Citations',
        type: 'references',
        minFontSize: 12,
        maxFontSize: 14
      }
    ]
  },
  {
    id: 'modern-landscape',
    name: 'Modern Landscape',
    type: 'modern',
    width: 14400,
    height: 10800,
    orientation: 'landscape',
    sections: [
      {
        id: 'title',
        name: 'Title & Authors',
        area: '1/1/3/13',
        placeholder: 'Enter title, authors, and affiliations',
        type: 'text',
        required: true,
        minFontSize: 32,
        maxFontSize: 48
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/1/6/4',
        placeholder: 'Research summary',
        type: 'text',
        minFontSize: 18,
        maxFontSize: 24
      },
      {
        id: 'main-figure',
        name: 'Main Figure',
        area: '3/4/6/10',
        placeholder: 'Key visualization',
        type: 'figure',
        minFontSize: 14,
        maxFontSize: 18
      },
      {
        id: 'impact',
        name: 'Impact',
        area: '3/10/6/13',
        placeholder: 'Research significance',
        type: 'text',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '6/1/8/5',
        placeholder: 'Methodology',
        type: 'methods',
        minFontSize: 14,
        maxFontSize: 18
      },
      {
        id: 'results',
        name: 'Results',
        area: '6/5/8/9',
        placeholder: 'Key findings',
        type: 'results',
        minFontSize: 14,
        maxFontSize: 18
      },
      {
        id: 'references',
        name: 'References',
        area: '6/9/8/13',
        placeholder: 'Citations',
        type: 'references',
        minFontSize: 12,
        maxFontSize: 14
      }
    ]
  },
  {
    id: 'classic-portrait',
    name: 'Classic Portrait',
    type: 'classic',
    width: 10800,
    height: 14400,
    orientation: 'portrait',
    sections: [
      {
        id: 'title',
        name: 'Title & Authors',
        area: '1/1/2/13',
        placeholder: 'Enter title, authors, and affiliations',
        type: 'text',
        required: true,
        minFontSize: 32,
        maxFontSize: 48
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '2/1/4/7',
        placeholder: 'Background and objectives',
        type: 'text',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '2/7/4/13',
        placeholder: 'Methodology',
        type: 'methods',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'results',
        name: 'Results',
        area: '4/1/8/13',
        placeholder: 'Findings and data',
        type: 'results',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '8/1/10/13',
        placeholder: 'Interpretation and implications',
        type: 'text',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'references',
        name: 'References',
        area: '10/1/11/13',
        placeholder: 'Citations',
        type: 'references',
        minFontSize: 12,
        maxFontSize: 14
      }
    ]
  },
  {
    id: 'classic-landscape',
    name: 'Classic Landscape',
    type: 'classic',
    width: 14400,
    height: 10800,
    orientation: 'landscape',
    sections: [
      {
        id: 'title',
        name: 'Title & Authors',
        area: '1/1/2/13',
        placeholder: 'Enter title, authors, and affiliations',
        type: 'text',
        required: true,
        minFontSize: 32,
        maxFontSize: 48
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '2/1/5/5',
        placeholder: 'Background and objectives',
        type: 'text',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '2/5/5/9',
        placeholder: 'Methodology',
        type: 'methods',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'results',
        name: 'Results',
        area: '2/9/5/13',
        placeholder: 'Findings and data',
        type: 'results',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '5/1/8/7',
        placeholder: 'Interpretation and implications',
        type: 'text',
        minFontSize: 16,
        maxFontSize: 20
      },
      {
        id: 'references',
        name: 'References',
        area: '5/7/8/13',
        placeholder: 'Citations',
        type: 'references',
        minFontSize: 12,
        maxFontSize: 14
      }
    ]
  }
];

const TemplatePreview: React.FC<{ template: PosterTemplate }> = ({ template }) => {
  return (
    <div 
      className={`w-full ${
        template.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'
      } bg-white rounded-lg border border-gray-200 shadow-sm p-2`}
    >
      <div 
        className="w-full h-full bg-gray-50"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(12, 1fr)',
          gap: '2px'
        }}
      >
        {template.sections.map((section) => (
          <div
            key={section.id}
            className={`bg-white border border-gray-200 rounded p-1 shadow-sm ${
              section.type === 'figure' ? 'bg-blue-50' :
              section.type === 'text' ? 'bg-green-50' :
              section.type === 'references' ? 'bg-yellow-50' :
              'bg-purple-50'
            }`}
            style={{ gridArea: section.area }}
          >
            <div className="w-full h-full flex flex-col">
              <div className="text-[6px] font-medium text-gray-600 truncate">
                {section.name}
              </div>
              {section.type === 'figure' && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full h-2 bg-blue-200 rounded" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PosterTemplates: React.FC<PosterTemplatesProps> = ({
  onSelectTemplate,
  onCustomSize
}) => {
  return (
    <div className="space-y-8">
      {/* Modern Templates */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Modern Templates</h3>
        <div className="grid grid-cols-1 gap-4">
          {templates.filter(t => t.type === 'modern').map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="relative p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors bg-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Layout className="h-6 w-6 text-gray-400" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {template.orientation === 'landscape' ? '48" × 36"' : '36" × 48"'}
                  </p>
                </div>
              </div>
              <TemplatePreview template={template} />
            </button>
          ))}
        </div>
      </div>

      {/* Classic Templates */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Classic Templates</h3>
        <div className="grid grid-cols-1 gap-4">
          {templates.filter(t => t.type === 'classic').map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="relative p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors bg-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Layout className="h-6 w-6 text-gray-400" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {template.orientation === 'landscape' ? '48" × 36"' : '36" × 48"'}
                  </p>
                </div>
              </div>
              <TemplatePreview template={template} />
            </button>
          ))}
        </div>
      </div>

      {/* Custom Size Option */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Custom Size
        </h3>
        <button
          onClick={onCustomSize}
          className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors bg-white"
        >
          <div className="flex items-center justify-center space-x-2">
            <Maximize2 className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">Create Custom Size</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PosterTemplates;