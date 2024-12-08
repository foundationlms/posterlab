import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { PosterSection as PosterSectionType } from '../../types/poster';
import { getOptimalContentSize } from '../../utils/contentScaling';

interface PosterSectionProps {
  section: PosterSectionType;
  content: any;
  onContentChange: (content: any) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
  };
}

const PosterSection: React.FC<PosterSectionProps> = ({
  section,
  content,
  onContentChange,
  styles
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const { fontSize, lineHeight } = getOptimalContentSize(section, containerRef.current);
      contentRef.current.style.fontSize = `${fontSize}px`;
      contentRef.current.style.lineHeight = lineHeight.toString();
    }
  }, [section, content, containerRef.current?.clientWidth, containerRef.current?.clientHeight]);

  const handleClick = () => {
    if (section.type === 'header' && !content) {
      onContentChange({
        title: '',
        authors: [],
        affiliations: []
      });
    } else if (!content) {
      onContentChange('');
    }
  };

  const renderContent = () => {
    if (!content) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          {section.type === 'header' ? (
            <span className="text-lg">+ Your Title and Authors</span>
          ) : (
            <Plus className="h-8 w-8" />
          )}
        </div>
      );
    }

    if (section.type === 'header') {
      return (
        <div className="text-center space-y-4" ref={contentRef}>
          <h1 className="text-2xl font-bold" style={{ color: styles.titleColor }}>
            {content.title || '+ Your Title and Authors'}
          </h1>
          {content.authors?.length > 0 && (
            <div className="text-lg" style={{ color: styles.textColor }}>
              {content.authors.map((author: any, index: number) => (
                <span key={index}>
                  {author.name}
                  {author.affiliations?.length > 0 && (
                    <sup>{author.affiliations.join(',')}</sup>
                  )}
                  {author.isCorresponding && <sup>*</sup>}
                  {index < content.authors.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
          {content.affiliations?.length > 0 && (
            <div className="text-sm space-y-1" style={{ color: styles.textColor }}>
              {content.affiliations.map((aff: any) => (
                <div key={aff.id}>
                  <sup>{aff.id}</sup>
                  {[
                    aff.institution,
                    aff.department,
                    [aff.city, aff.country].filter(Boolean).join(', ')
                  ].filter(Boolean).join(', ')}
                </div>
              ))}
            </div>
          )}
          {content.authors?.some((a: any) => a.isCorresponding && a.email) && (
            <div className="text-sm" style={{ color: styles.textColor }}>
              *Corresponding author: {content.authors.find((a: any) => a.isCorresponding)?.email}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        ref={contentRef}
        className="prose max-w-none"
        style={{ color: styles.textColor }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const isHeader = section.type === 'header';

  return (
    <div
      ref={containerRef}
      className={`h-full rounded-lg border overflow-hidden hover:border-indigo-500 transition-colors cursor-pointer ${
        isHeader 
          ? 'border-gray-300 bg-gradient-to-b from-gray-50 to-white shadow-sm' 
          : 'border-gray-200 bg-white'
      }`}
      onClick={handleClick}
    >
      {!isHeader && (
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
          <h3 className="text-sm font-medium" style={{ color: styles.titleColor }}>
            {section.name}
          </h3>
        </div>
      )}
      <div className={`p-4 ${!isHeader ? 'h-[calc(100%-2.5rem)]' : 'h-full'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PosterSection;