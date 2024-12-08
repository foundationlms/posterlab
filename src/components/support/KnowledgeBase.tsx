import React from 'react';
import { Book, Lightbulb, HelpCircle, Wrench, ArrowRight } from 'lucide-react';
import { Article } from '../../types/support';
import { format } from 'date-fns';

interface KnowledgeBaseProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ articles, onSelectArticle }) => {
  const categories = ['Tutorials', 'FAQs', 'Troubleshooting'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tutorials':
        return <Lightbulb className="h-6 w-6 text-yellow-500" />;
      case 'FAQs':
        return <HelpCircle className="h-6 w-6 text-blue-500" />;
      case 'Troubleshooting':
        return <Wrench className="h-6 w-6 text-purple-500" />;
      default:
        return <Book className="h-6 w-6 text-indigo-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tutorials':
        return 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100';
      case 'FAQs':
        return 'bg-blue-50 text-blue-800 hover:bg-blue-100';
      case 'Troubleshooting':
        return 'bg-purple-50 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Featured Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="relative group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {getCategoryIcon(category)}
              <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {category === 'Tutorials' && 'Step-by-step guides to help you get started'}
              {category === 'FAQs' && 'Quick answers to common questions'}
              {category === 'Troubleshooting' && 'Solutions to common issues and problems'}
            </p>
            <span className="absolute inset-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
          </div>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryArticles = articles.filter(article => article.category === category);
          if (categoryArticles.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(category)}
                <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className={`text-left p-4 rounded-lg transition-colors ${getCategoryColor(article.category)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="mt-1 text-sm opacity-75 line-clamp-2">
                          {article.content.substring(0, 120)}...
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-4 flex items-center text-xs space-x-4 opacity-75">
                      <span>{format(new Date(article.lastUpdated), 'MMM d, yyyy')}</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for new articles and guides
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;