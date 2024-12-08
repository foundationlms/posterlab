import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Type, Table } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import ImageUploader from './ImageUploader';
import { PosterSection, PosterElement } from '../types/poster';
import SectionTutorial from './SectionTutorial';

interface SectionWorkspaceProps {
  section: PosterSection;
  onClose: () => void;
  onSave: (element: PosterElement) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    headingColor: string;
    textColor: string;
    backgroundColor: string;
    accentColor: string;
  };
}

const SectionWorkspace: React.FC<SectionWorkspaceProps> = ({
  section,
  onClose,
  onSave,
  styles,
}) => {
  const [contentType, setContentType] = useState<'text' | 'image' | 'table'>('text');
  const [content, setContent] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!content.trim()) return;

    const element: PosterElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: contentType,
      content,
      position: { x: 0, y: 0 },
      sectionId: section.id,
      metadata: {
        lastModified: new Date().toISOString(),
        fontSize: section.minFontSize || 14,
        textAlign: 'left'
      }
    };

    onSave(element);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-75">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 flex max-w-full pl-0">
          <div className="w-screen">
            <div className="flex h-full flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Edit {section.name}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Tutorial */}
              {showTutorial && (
                <div className="px-6 py-4 border-b border-gray-200">
                  <SectionTutorial section={section} />
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Hide Tutorial
                  </button>
                </div>
              )}

              {/* Content Type Selection */}
              <div className="border-b border-gray-200">
                <div className="px-6 py-3">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setContentType('text')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        contentType === 'text'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Type className="h-5 w-5 inline-block mr-2" />
                      Text
                    </button>
                    <button
                      onClick={() => setContentType('image')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        contentType === 'image'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ImageIcon className="h-5 w-5 inline-block mr-2" />
                      Image
                    </button>
                    <button
                      onClick={() => setContentType('table')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        contentType === 'table'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Table className="h-5 w-5 inline-block mr-2" />
                      Table
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="flex-1 overflow-y-auto p-6">
                {contentType === 'text' && (
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                  />
                )}

                {contentType === 'image' && (
                  <ImageUploader
                    onImageSelect={(file) => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setContent(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                )}

                {contentType === 'table' && (
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                  />
                )}
              </div>

              {/* Action buttons */}
              <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 inline-block mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWorkspace;