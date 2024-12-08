import React, { useState } from 'react';
import { Save, Download, Layout, Share2 } from 'lucide-react';
import PosterCanvas from '../components/PosterCanvas';
import PosterTemplates from '../components/PosterTemplates';
import CustomSizeDialog from '../components/CustomSizeDialog';
import ActionDialog from '../components/ActionDialog';
import { savePoster, sharePoster, exportPoster } from '../utils/posterActions';
import { PosterTemplate, PosterElement } from '../types/poster';

const PosterBuilder = () => {
  const [activeTab, setActiveTab] = useState('layout');
  const [elements, setElements] = useState<PosterElement[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplate | null>(null);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [title, setTitle] = useState('Untitled Poster');
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'share' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  const handleTemplateSelect = (template: PosterTemplate) => {
    setSelectedTemplate(template);
    setElements([]);
  };

  const handleCustomSize = (width: number, height: number) => {
    // Handle custom size template creation
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;

    try {
      const posterData = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        template: selectedTemplate,
        elements,
        lastModified: new Date().toISOString(),
      };

      await savePoster(posterData);
      setDialog({
        isOpen: true,
        title: 'Poster Saved',
        message: 'Your poster has been saved successfully.',
        type: 'success'
      });
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'Error',
        message: 'Failed to save the poster. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium border-none focus:ring-0"
              placeholder="Untitled Poster"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-4 py-3" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('layout')}
                className={`${
                  activeTab === 'layout'
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 text-sm font-medium rounded-md`}
              >
                Layout
              </button>
              <button
                onClick={() => setActiveTab('styles')}
                className={`${
                  activeTab === 'styles'
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 text-sm font-medium rounded-md`}
              >
                Styles
              </button>
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'layout' && (
              <PosterTemplates
                onSelectTemplate={handleTemplateSelect}
                onCustomSize={() => setShowCustomDialog(true)}
              />
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="max-w-[90%] mx-auto">
            {selectedTemplate ? (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <PosterCanvas
                  template={selectedTemplate}
                  elements={elements}
                  onElementsChange={setElements}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select a template to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CustomSizeDialog
        isOpen={showCustomDialog}
        onClose={() => setShowCustomDialog(false)}
        onConfirm={handleCustomSize}
      />

      <ActionDialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </div>
  );
};

export default PosterBuilder;