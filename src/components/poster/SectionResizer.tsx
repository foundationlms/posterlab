import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface SectionResizerProps {
  width: number;
  height: number;
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const SectionResizer: React.FC<SectionResizerProps> = ({
  width,
  height,
  onResize,
  children,
  minWidth = 100,
  minHeight = 100,
  maxWidth = Infinity,
  maxHeight = Infinity
}) => {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <ResizableBox
      width={width}
      height={height}
      minConstraints={[minWidth, minHeight]}
      maxConstraints={[maxWidth, maxHeight]}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, { size }) => {
        setIsResizing(false);
        onResize(size.width, size.height);
      }}
      className={`relative ${isResizing ? 'pointer-events-none' : ''}`}
      handle={<div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" />}
    >
      {children}
    </ResizableBox>
  );
};

export default SectionResizer;