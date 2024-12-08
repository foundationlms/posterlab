import React from 'react';
import { X, Book, Eye, Calendar, ArrowLeft } from 'lucide-react';
import { Article } from '../../types/support';
import { format } from 'date-fns';

interface ArticleViewProps {
  article: Article;
  onClose: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-8 py-6">
            <button
              onClick={onClose}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Knowledge Base
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {article.title}
                </h1>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Eye className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span>{article.views} views</span>
                  <span className="mx-2">•</span>
                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span>Updated {format(new Date(article.lastUpdated), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-indigo max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Was this article helpful?</h3>
              <div className="mt-2 flex space-x-3">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Yes
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;