import React, { useState, useEffect } from 'react';
import { Plus, Search, Book, Lightbulb, HelpCircle, Wrench, Eye, Edit2, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types/support';
import { saveArticle, getArticles, deleteArticle } from '../utils/articleStorage';
import ArticleEditor from '../components/admin/ArticleEditor';
import { format } from 'date-fns';

const AdminKnowledgeBase: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const articles = getArticles();
    setArticles(articles);
  };

  const handleSaveArticle = async (article: Article) => {
    try {
      await saveArticle(article);
      loadArticles();
      setShowEditor(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error('Failed to save article:', error);
    }
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowEditor(true);
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(articleId);
        loadArticles();
      } catch (error) {
        console.error('Failed to delete article:', error);
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tutorials':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'FAQs':
        return <HelpCircle className="h-5 w-5 text-blue-500" />;
      case 'Troubleshooting':
        return <Wrench className="h-5 w-5 text-purple-500" />;
      default:
        return <Book className="h-5 w-5 text-indigo-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tutorials':
        return 'bg-yellow-50 text-yellow-800';
      case 'FAQs':
        return 'bg-blue-50 text-blue-800';
      case 'Troubleshooting':
        return 'bg-purple-50 text-purple-800';
      default:
        return 'bg-indigo-50 text-indigo-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-600';
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage help articles and documentation
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setSelectedArticle(null);
              setShowEditor(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0 max-w-md">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex sm:space-x-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md min-w-[160px]"
          >
            <option value="all">All Categories</option>
            <option value="Tutorials">Tutorials</option>
            <option value="FAQs">FAQs</option>
            <option value="Troubleshooting">Troubleshooting</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-2 sm:mt-0 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(article.category)}
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(article.status)}`}>
                  {article.status}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {article.content.substring(0, 150)}...
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {article.views} views
                </div>
                <span>
                  {format(new Date(article.lastUpdated), 'MMM d, yyyy')}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditArticle(article)}
                  className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-50"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first article
          </p>
          <button
            onClick={() => {
              setSelectedArticle(null);
              setShowEditor(true);
            }}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </button>
        </div>
      )}

      {/* Article Editor Modal */}
      <ArticleEditor
        isOpen={showEditor}
        onClose={() => {
          setShowEditor(false);
          setSelectedArticle(null);
        }}
        onSave={handleSaveArticle}
        article={selectedArticle}
      />
    </div>
  );
};

export default AdminKnowledgeBase;