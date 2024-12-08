import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { ValidationWarning } from '../utils/posterValidation';

interface ValidationOverlayProps {
  warnings: ValidationWarning[];
  onFix?: (warning: ValidationWarning) => void;
}

const ValidationOverlay: React.FC<ValidationOverlayProps> = ({ warnings, onFix }) => {
  const getIcon = (severity: ValidationWarning['severity']) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getSeverityColor = (severity: ValidationWarning['severity']) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 text-red-800';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800';
      default:
        return 'bg-blue-50 text-blue-800';
    }
  };

  if (warnings.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm space-y-2">
      {warnings.map((warning, index) => (
        <div
          key={index}
          className={`rounded-lg shadow-lg p-4 ${getSeverityColor(warning.severity)}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(warning.severity)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">
                {warning.message}
              </p>
              {onFix && warning.severity !== 'info' && warning.elementId && (
                <button
                  onClick={() => onFix(warning)}
                  className="mt-2 text-sm font-medium underline hover:opacity-80"
                >
                  Fix Issue
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ValidationOverlay;