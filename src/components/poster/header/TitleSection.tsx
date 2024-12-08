import React from 'react';
import Title from './Title';
import AuthorList from './AuthorList';
import AffiliationList from './AffiliationList';
import CorrespondingAuthor from './CorrespondingAuthor';
import { Author, Affiliation, HeaderStyles } from './types';

interface TitleSectionProps {
  title: string;
  authors: Author[];
  affiliations: Affiliation[];
  onTitleChange: (title: string) => void;
  onAuthorsChange: (authors: Author[]) => void;
  onAffiliationsChange: (affiliations: Affiliation[]) => void;
  styles: HeaderStyles;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  authors,
  affiliations,
  onTitleChange,
  onAuthorsChange,
  onAffiliationsChange,
  styles
}) => {
  return (
    <div 
      className="w-full rounded-lg p-8 space-y-6"
      style={{
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily
      }}
    >
      <div className="text-center space-y-8">
        <Title 
          title={title} 
          onChange={onTitleChange} 
          styles={styles} 
        />
        <div className="space-y-4">
          <AuthorList authors={authors} />
          <AffiliationList affiliations={affiliations} />
          <CorrespondingAuthor authors={authors} />
        </div>
      </div>
    </div>
  );
};

export default TitleSection;