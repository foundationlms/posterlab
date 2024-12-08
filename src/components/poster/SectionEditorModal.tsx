import React from 'react';
import { X } from 'lucide-react';
import { PosterSection } from '../../types/poster';
import RichTextEditor from '../RichTextEditor';
import HeaderEditor from './header/HeaderEditor';

interface SectionEditorModalProps {
  section: PosterSection;
  content: any;
  onSave: (content: any) => void;
  onClose: () => void;
}

const SectionEditorModal: React.FC<SectionEditorModalProps> = ({
  section,
  content,
  onSave,
  onClose
}) => {
  const handleSave = (newContent: any) => {
    onSave(newContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Edit {section.name}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {section.type === 'header' ? (
              <HeaderEditor
                isOpen={true}
                onClose={onClose}
                onSave={handleSave}
                initialContent={content || {
                  title: '',
                  authors: [],
                  affiliations: []
                }}
              />
            ) : (
              <div className="p-6">
                <RichTextEditor
                  content={content || ''}
                  onChange={handleSave}
                  placeholder={`Add ${section.name.toLowerCase()} content...`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionEditorModal;