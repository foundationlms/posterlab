import React, { useState } from 'react';
import { FileText, Tag, Clock, Edit2, Trash2, ArrowUpRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../../types/support';
import StatusBadge from './StatusBadge';
import ArticlePreviewModal from './ArticlePreviewModal';

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (articleId: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit, onDelete }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {articles.map((article) => (
          <li key={article.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Tag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {article.category}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {article.views.toLocaleString()} views
                  </div>
                  <StatusBadge status={article.status} />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(article)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => onDelete(article.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  Updated {formatDistanceToNow(new Date(article.lastUpdated))} ago
                </div>
                <button
                  onClick={() => {
                    setSelectedArticle(article);
                    setShowPreview(true);
                  }}
                  className="flex items-center text-indigo-600 hover:text-indigo-900"
                >
                  View article
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ArticlePreviewModal
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
      />
    </>
  );
};

export default ArticleList;