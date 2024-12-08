import React, { useState, useEffect } from 'react';
import { Plus, Search, Book, MessageSquare } from 'lucide-react';
import { Ticket, Article } from '../types/support';
import { getPublishedArticles } from '../utils/articleStorage';
import { getStoredTickets, saveTicket } from '../utils/supportStorage';
import TicketList from '../components/support/TicketList';
import TicketForm from '../components/support/TicketForm';
import TicketView from '../components/support/TicketView';
import KnowledgeBase from '../components/support/KnowledgeBase';
import ArticleView from '../components/support/ArticleView';

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'knowledge'>('tickets');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTickets();
    loadArticles();
  }, []);

  const loadTickets = () => {
    const storedTickets = getStoredTickets();
    setTickets(storedTickets);
  };

  const loadArticles = () => {
    const publishedArticles = getPublishedArticles();
    setArticles(publishedArticles);
  };

  const handleCreateTicket = async (ticket: Ticket) => {
    try {
      await saveTicket(ticket);
      loadTickets();
      setShowTicketForm(false);
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  const handleUpdateTicket = async (ticket: Ticket) => {
    try {
      await saveTicket(ticket);
      loadTickets();
      setSelectedTicket(ticket);
    } catch (error) {
      console.error('Failed to update ticket:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <p className="mt-2 text-sm text-gray-700">
            Get help and find answers to common questions
          </p>
        </div>
        {activeTab === 'tickets' && (
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowTicketForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`${
              activeTab === 'tickets'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`${
              activeTab === 'knowledge'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Book className="h-5 w-5 mr-2" />
            Knowledge Base
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="mt-8">
        <div className="max-w-md">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={activeTab === 'tickets' ? 'Search tickets...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === 'tickets' ? (
          <TicketList 
            tickets={filteredTickets} 
            onSelectTicket={setSelectedTicket}
          />
        ) : (
          <KnowledgeBase 
            articles={filteredArticles}
            onSelectArticle={setSelectedArticle}
          />
        )}
      </div>

      {/* Modals */}
      <TicketForm
        isOpen={showTicketForm}
        onClose={() => setShowTicketForm(false)}
        onSubmit={handleCreateTicket}
      />

      {selectedTicket && (
        <TicketView
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleUpdateTicket}
        />
      )}

      {selectedArticle && (
        <ArticleView
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Support;