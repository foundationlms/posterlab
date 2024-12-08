import React, { useState, useRef } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';
import { validateImage } from '../utils/imageValidation';
import ImageEditor from './ImageEditor';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  maxFileSize?: number;
  minDpi?: number;
  aspectRatio?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  minDpi = 300,
  aspectRatio
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setWarnings([]);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setWarnings(['Please select an image file']);
      return;
    }

    const validationWarnings = await validateImage(file, minDpi, maxFileSize, aspectRatio);
    setWarnings(validationWarnings.map(w => w.message));
    
    setSelectedFile(file);
    setShowEditor(true);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-2">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Upload className="h-12 w-12" />
          </div>
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Upload a file</span>
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to {maxFileSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Image Warnings
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditor && selectedFile && (
        <ImageEditor
          file={selectedFile}
          aspectRatio={aspectRatio}
          onSave={(editedFile) => {
            onImageSelect(editedFile);
            setShowEditor(false);
            setSelectedFile(null);
          }}
          onCancel={() => {
            setShowEditor(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
};

export default ImageUploader;