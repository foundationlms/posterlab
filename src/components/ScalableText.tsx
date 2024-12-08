import React, { useEffect, useRef, useState } from 'react';
import { calculateOptimalFontSize } from '../utils/textScaling';

interface ScalableTextProps {
  content: string;
  containerWidth: number;
  containerHeight: number;
  config?: {
    minSize?: number;
    maxSize?: number;
    lineHeight?: number;
  };
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

const ScalableText: React.FC<ScalableTextProps> = ({
  content,
  containerWidth,
  containerHeight,
  config = {},
  className = '',
  tag: Tag = 'div',
  style = {}
}) => {
  const {
    minSize = 12,
    maxSize = 72,
    lineHeight = 1.2
  } = config;

  const textRef = useRef<HTMLElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current && containerWidth && containerHeight) {
      const optimalSize = calculateOptimalFontSize(
        content,
        containerWidth,
        containerHeight,
        minSize,
        maxSize,
        lineHeight
      );
      setFontSize(optimalSize);

      // Check for overflow after setting font size
      const element = textRef.current;
      setIsOverflowing(
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }
  }, [content, containerWidth, containerHeight, minSize, maxSize, lineHeight]);

  return (
    <Tag
      ref={textRef}
      className={`overflow-hidden ${className} ${isOverflowing ? 'text-yellow-600' : ''}`}
      style={{
        ...style,
        fontSize: fontSize ? `${fontSize}px` : undefined,
        lineHeight,
        transition: 'font-size 0.2s ease-in-out'
      }}
    >
      {content}
    </Tag>
  );
};

export default ScalableText;