import React from 'react';

interface StatusBadgeProps {
  status: string;
  priority?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, priority }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex space-x-2">
      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
      {priority && (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;