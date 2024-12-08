import React, { useState, useRef, useEffect } from 'react';
import { Move, ZoomIn, ZoomOut, RotateCw, Check } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  aspectRatio?: number;
  onCrop: (croppedImage: Blob) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageUrl, aspectRatio, onCrop }) => {
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

  const handleCrop = () => {
    if (!containerRef.current || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      imageRef.current,
      position.x,
      position.y,
      imageRef.current.width,
      imageRef.current.height
    );

    canvas.toBlob((blob) => {
      if (blob) onCrop(blob);
    }, 'image/png');
  };

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-gray-100 rounded-lg"
        style={{
          height: '400px',
          aspectRatio: aspectRatio || 16/9
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Crop preview"
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
        onClick={handleCrop}
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Check className="h-4 w-4 mr-2" />
        Apply Crop
      </button>
    </div>
  );
};

export default ImageCropper;