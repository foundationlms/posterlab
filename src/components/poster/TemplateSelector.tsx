import React from 'react';
import { PosterTemplate } from '../../types/poster';
import { templates } from '../../data/templates';
import TemplatePreview from './TemplatePreview';

interface TemplateSelectorProps {
  onSelectTemplate: (template: PosterTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  // Group templates by type
  const internationalTemplates = templates.filter(t => t.type === 'international');
  const usTemplates = templates.filter(t => t.type === 'us');

  return (
    <div className="space-y-12">
      {/* US Templates */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">US Standard Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usTemplates.map((template) => (
            <TemplatePreview
              key={template.id}
              template={template}
              onSelect={() => onSelectTemplate(template)}
            />
          ))}
        </div>
      </div>

      {/* International Templates */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">International Sizes (ISO)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internationalTemplates.map((template) => (
            <TemplatePreview
              key={template.id}
              template={template}
              onSelect={() => onSelectTemplate(template)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;