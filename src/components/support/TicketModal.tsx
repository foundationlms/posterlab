// Previous imports remain the same
import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Tag, AlertCircle, Clock, Send } from 'lucide-react';
import { Ticket } from '../../types/support';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ticket: Ticket) => void;
  ticket?: Ticket | null;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, onSave, ticket }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    status: 'open',
    priority: 'medium',
    category: 'Technical',
  });
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (ticket) {
      setFormData({
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
      });
    }
  }, [ticket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...ticket,
      ...formData,
      id: ticket?.id || `T-${Math.random().toString(36).substr(2, 9)}`,
      lastUpdated: new Date().toISOString(),
      created: ticket?.created || new Date().toISOString(),
      user: ticket?.user || {
        name: 'System',
        email: 'system@posterlab.com',
      },
      messages: ticket?.messages || [],
      assignedTo: user?.role === 'admin' ? {
        name: user.name,
        email: user.email,
      } : undefined,
    });
  };

  const handleAddMessage = () => {
    if (!newMessage.trim() || !ticket) return;

    const updatedTicket = {
      ...ticket,
      messages: [
        ...ticket.messages,
        {
          id: Math.random().toString(36).substr(2, 9),
          content: newMessage,
          sender: user?.role || 'user',
          timestamp: new Date().toISOString(),
        }
      ],
      lastUpdated: new Date().toISOString(),
    };

    onSave(updatedTicket);
    setNewMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {ticket ? `Ticket #${ticket.id}` : 'New Ticket'}
                  </h3>
                  {ticket && (
                    <p className="text-sm text-gray-500">
                      From: {ticket.user.email}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white px-6 py-6">
              <div className="space-y-6">
                {/* Ticket Details */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Ticket Details</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Tag className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter ticket subject"
                          required
                          readOnly={user?.role === 'admin'}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="description"
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter ticket description"
                          required
                          readOnly={user?.role === 'admin'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Admin Controls */}
                {user?.role === 'admin' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Admin Controls</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          id="status"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as Ticket['status'] })}
                          className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <select
                          id="priority"
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value as Ticket['priority'] })}
                          className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message History */}
                {ticket && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Message History</h4>
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {ticket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                              message.sender === 'admin'
                                ? 'bg-indigo-100 text-indigo-900'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(message.timestamp), 'MMM d, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* New Message Input */}
                    <div className="mt-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleAddMessage();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddMessage}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
                {(!ticket || user?.role !== 'admin') && (
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {ticket ? 'Update Ticket' : 'Create Ticket'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;