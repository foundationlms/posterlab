import React from 'react';
import { HeaderEditor } from './header';
import RichTextEditor from '../RichTextEditor';

interface SectionEditorProps {
  section: {
    id: string;
    name: string;
    type?: string;
  };
  content: any;
  onSave: (content: any) => void;
  onClose: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  content,
  onSave,
  onClose
}) => {
  // Special handling for header section
  if (section.type === 'header') {
    return (
      <HeaderEditor
        authors={content.authors || []}
        affiliations={content.affiliations || []}
        onAuthorsChange={(authors) => onSave({ ...content, authors })}
        onAffiliationsChange={(affiliations) => onSave({ ...content, affiliations })}
      />
    );
  }

  // Default editor for other sections
  return (
    <RichTextEditor
      content={content || ''}
      onChange={(newContent) => onSave(newContent)}
    />
  );
};

export default SectionEditor;