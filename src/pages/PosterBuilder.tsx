import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PosterProvider } from '../context/PosterContext';
import BuilderToolbar from '../components/poster/toolbar/BuilderToolbar';
import BuilderWorkspace from '../components/poster/workspace/BuilderWorkspace';
import SectionEditorModal from '../components/poster/SectionEditorModal';

const PosterBuilderContent = () => {
  const navigate = useNavigate();
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <BuilderToolbar
        onChangeTemplate={() => navigate('/templates')}
        onToggleStyles={() => setShowStylePanel(!showStylePanel)}
        showStylePanel={showStylePanel}
      />

      <BuilderWorkspace
        showStylePanel={showStylePanel}
        onSectionClick={setSelectedSection}
      />

      {selectedSection && (
        <SectionEditorModal
          sectionId={selectedSection}
          onClose={() => setSelectedSection(null)}
        />
      )}
    </div>
  );
};

const PosterBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const template = location.state?.template;

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Template Selected</h1>
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Choose Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <PosterProvider initialTemplate={template}>
      <PosterBuilderContent />
    </PosterProvider>
  );
};

export default PosterBuilder;