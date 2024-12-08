import React from 'react';
import { Author } from './types';

interface CorrespondingAuthorProps {
  authors: Author[];
}

const CorrespondingAuthor: React.FC<CorrespondingAuthorProps> = ({ authors }) => {
  const correspondingAuthor = authors.find(a => a.isCorresponding);
  
  if (!correspondingAuthor) return null;

  return (
    <div className="text-sm text-gray-500 mt-4">
      *Corresponding author: {correspondingAuthor.email}
    </div>
  );
};

export default CorrespondingAuthor;