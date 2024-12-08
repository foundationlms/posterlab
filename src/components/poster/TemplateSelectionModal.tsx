import React from 'react';
import { Layout } from 'lucide-react';
import { PosterTemplate } from '../../types/poster';
import TemplateSelector from './TemplateSelector';

interface TemplateSelectionModalProps {
  onSelect: (template: PosterTemplate) => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Layout className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Choose a Template
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Select a template to get started with your scientific poster
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <TemplateSelector onSelectTemplate={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;