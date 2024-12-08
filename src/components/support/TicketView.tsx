import React, { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';
import { Ticket } from '../../types/support';
import { format } from 'date-fns';
import StatusBadge from './StatusBadge';

interface TicketViewProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (ticket: Ticket) => void;
}

const TicketView: React.FC<TicketViewProps> = ({ ticket, onClose, onUpdate }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedTicket: Ticket = {
      ...ticket,
      messages: [
        ...ticket.messages,
        {
          id: Math.random().toString(36).substr(2, 9),
          content: newMessage,
          sender: 'user',
          timestamp: new Date().toISOString()
        }
      ],
      lastUpdated: new Date().toISOString()
    };

    onUpdate(updatedTicket);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {ticket.subject}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Ticket #{ticket.id}</span>
                    <span className="mx-2">•</span>
                    <span>{format(new Date(ticket.created), 'MMM d, yyyy')}</span>
                  </div>
                  <StatusBadge status={ticket.status} priority={ticket.priority} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{ticket.description}</p>
              </div>

              <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
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
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;