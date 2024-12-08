import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Upload, ZoomIn, ZoomOut, RotateCw, Move } from 'lucide-react';

interface FigureEditorProps {
  initialSrc?: string;
  onSave: (result: { src: string }) => void;
}

const FigureEditor: React.FC<FigureEditorProps> = ({
  initialSrc,
  onSave
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSaveClick = () => {
    if (!containerRef.current || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;

    // Apply transformations
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw image
    ctx.drawImage(
      imageRef.current,
      position.x,
      position.y,
      imageRef.current.width,
      imageRef.current.height
    );

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png');
    onSave({ src: dataUrl });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onSave({ src: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {initialSrc ? (
        <>
          <div
            ref={containerRef}
            className="relative overflow-hidden bg-gray-100 rounded-lg"
            style={{ height: '500px', aspectRatio: '16/9' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={initialSrc}
              alt="Edit"
              className="absolute transform-gpu"
              style={{
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              draggable={false}
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setScale(s => Math.max(0.1, s - 0.1))}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Zoom Out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={() => setScale(s => Math.min(3, s + 0.1))}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Zoom In"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={() => setRotation(r => (r + 90) % 360)}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Rotate"
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={handleSaveClick}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Apply Changes
          </button>
        </>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop an image here, or
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FigureEditor;