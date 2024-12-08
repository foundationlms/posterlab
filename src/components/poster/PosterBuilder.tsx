import React, { useState } from 'react';
import { Save, Download, Layout, Share2, Palette } from 'lucide-react';
import PosterCanvas from './PosterCanvas';
import StylePanel from './StylePanel';
import SectionEditorModal from './SectionEditorModal';
import { PosterTemplate } from '../../types/poster';

interface PosterBuilderProps {
  template: PosterTemplate;
  onSave: (elements: Record<string, any>, styles: any) => void;
  onChangeTemplate: () => void;
}

const PosterBuilder: React.FC<PosterBuilderProps> = ({
  template,
  onSave,
  onChangeTemplate
}) => {
  const [elements, setElements] = useState<Record<string, any>>({});
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [styles, setStyles] = useState({
    fontFamily: 'Inter, sans-serif',
    titleColor: '#1a365d',
    headingColor: '#2d3748',
    textColor: '#4a5568',
    backgroundColor: '#ffffff',
    accentColor: '#3182ce'
  });

  const handleStyleChange = (newStyles: Partial<typeof styles>) => {
    setStyles({ ...styles, ...newStyles });
  };

  const handleElementChange = (sectionId: string, content: any) => {
    setElements(prev => ({
      ...prev,
      [sectionId]: content
    }));
  };

  const handleSectionSave = (content: any) => {
    if (selectedSection) {
      handleElementChange(selectedSection, content);
      setSelectedSection(null);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={onChangeTemplate}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Layout className="h-4 w-4 mr-1.5" />
              Change Template
            </button>
            <button
              onClick={() => setShowStylePanel(!showStylePanel)}
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
              onClick={() => onSave(elements, styles)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className={`flex-1 overflow-auto bg-gray-50 p-8 ${showStylePanel ? 'mr-80' : ''}`}>
          <div className="max-w-[90%] mx-auto">
            <PosterCanvas
              template={template}
              elements={elements}
              onElementsChange={handleElementChange}
              styles={styles}
              onSectionClick={setSelectedSection}
            />
          </div>
        </div>

        {/* Style Panel */}
        {showStylePanel && (
          <div className="w-80 fixed right-0 top-0 bottom-0 border-l border-gray-200 bg-white overflow-y-auto">
            <StylePanel styles={styles} onStyleChange={handleStyleChange} />
          </div>
        )}
      </div>

      {/* Section Editor Modal */}
      {selectedSection && (
        <SectionEditorModal
          section={template.sections.find(s => s.id === selectedSection)!}
          content={elements[selectedSection]}
          onSave={handleSectionSave}
          onClose={() => setSelectedSection(null)}
        />
      )}
    </div>
  );
};

export default PosterBuilder;