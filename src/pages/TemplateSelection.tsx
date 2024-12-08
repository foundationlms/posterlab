import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'lucide-react';
import TemplateSelector from '../components/poster/TemplateSelector';
import { PosterTemplate } from '../types/poster';

const TemplateSelection = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (template: PosterTemplate) => {
    navigate('/builder', { 
      state: { template }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Layout className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates to create your scientific poster
          </p>
        </div>

        <TemplateSelector onSelectTemplate={handleTemplateSelect} />
      </div>
    </div>
  );
};

export default TemplateSelection;