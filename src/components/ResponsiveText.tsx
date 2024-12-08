import React, { useEffect, useRef, useState } from 'react';
import { calculateOptimalFontSize } from '../utils/posterValidation';

interface ResponsiveTextProps {
  content: string;
  containerWidth: number;
  containerHeight: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  content,
  containerWidth,
  containerHeight,
  minSize = 12,
  maxSize = 72,
  className = ''
}) => {
  const [fontSize, setFontSize] = useState(minSize);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const optimalSize = calculateOptimalFontSize(
      content,
      containerWidth,
      containerHeight,
      minSize,
      maxSize
    );
    setFontSize(optimalSize);
  }, [content, containerWidth, containerHeight, minSize, maxSize]);

  return (
    <div
      ref={textRef}
      className={className}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: 1.2,
        overflow: 'hidden'
      }}
    >
      {content}
    </div>
  );
};

export default ResponsiveText;