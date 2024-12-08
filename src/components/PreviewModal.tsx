import React from 'react';
import { X } from 'lucide-react';
import { PosterData } from '../types/poster';
import PosterCanvas from './PosterCanvas';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  poster: PosterData;
  previewRef: React.RefObject<HTMLDivElement>;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  poster,
  previewRef
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {poster.title}
                </h3>
              </div>
            </div>

            <div className="mt-5 sm:mt-4" ref={previewRef}>
              <PosterCanvas
                template={poster.template}
                elements={poster.elements}
                onElementsChange={() => {}}
                styles={poster.styles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;