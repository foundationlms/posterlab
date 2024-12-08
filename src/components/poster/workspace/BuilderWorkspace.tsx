import React from 'react';
import { PosterTemplate } from '../../../types/poster';
import PosterCanvas from '../PosterCanvas';
import StylePanel from '../StylePanel';

interface BuilderWorkspaceProps {
  template: PosterTemplate;
  elements: Record<string, any>;
  onElementsChange: (sectionId: string, content: any) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
  };
  showStylePanel: boolean;
  onStyleChange: (styles: any) => void;
  onSectionClick: (sectionId: string) => void;
}

const BuilderWorkspace: React.FC<BuilderWorkspaceProps> = ({
  template,
  elements,
  onElementsChange,
  styles,
  showStylePanel,
  onStyleChange,
  onSectionClick
}) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className={`flex-1 overflow-auto bg-gray-50 p-8 ${showStylePanel ? 'mr-80' : ''}`}>
        <div className="max-w-[90%] mx-auto">
          <PosterCanvas
            template={template}
            elements={elements}
            onElementsChange={onElementsChange}
            styles={styles}
            onSectionClick={onSectionClick}
          />
        </div>
      </div>

      {showStylePanel && (
        <div className="w-80 fixed right-0 top-0 bottom-0 border-l border-gray-200 bg-white overflow-y-auto">
          <StylePanel styles={styles} onStyleChange={onStyleChange} />
        </div>
      )}
    </div>
  );
};

export default BuilderWorkspace;