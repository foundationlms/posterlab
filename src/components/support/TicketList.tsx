import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Ticket } from '../../types/support';
import StatusBadge from './StatusBadge';

interface TicketListProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onSelectTicket }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <button
              onClick={() => onSelectTicket(ticket)}
              className="w-full text-left block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {ticket.subject}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <StatusBadge status={ticket.status} priority={ticket.priority} />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {ticket.description.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>
                      Created {formatDistanceToNow(new Date(ticket.created))} ago
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {tickets.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new ticket to get help from our support team
          </p>
        </div>
      )}
    </div>
  );
};

export default TicketList;