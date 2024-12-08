import React from 'react';
import { X } from 'lucide-react';
import { Article } from '../../types/support';

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  isOpen,
  onClose,
  article
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div>
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {article.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span>{article.category}</span>
                <span>•</span>
                <span>By {article.author}</span>
                <span>•</span>
                <span>{article.views.toLocaleString()} views</span>
              </div>

              <div className="prose max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreviewModal;