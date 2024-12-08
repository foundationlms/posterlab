import React, { useState } from 'react';
import { Sparkles, Loader, AlertCircle } from 'lucide-react';
import { generateContent, improveWriting, AIAssistantResponse } from '../../utils/openai';

interface AIAssistantProps {
  section: string;
  content?: string;
  onSuggestionApply: (content: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ section, content, onSuggestionApply }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImproveContent = async () => {
    if (!content) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await improveWriting(content, 'academic');
      if (response.error) {
        setError(response.error);
      } else {
        setSuggestions(response.suggestions || []);
      }
    } catch (err) {
      setError('Failed to generate suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateContent(
        `Generate content for the ${section} section of a scientific poster.`,
        section
      );
      if (response.error) {
        setError(response.error);
      } else {
        setSuggestions([response.content]);
      }
    } catch (err) {
      setError('Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={content ? handleImproveContent : handleGenerateContent}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {content ? 'Improve Writing' : 'Generate Content'}
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center text-sm text-gray-500">
          <Loader className="h-4 w-4 mr-2 animate-spin" />
          Generating suggestions...
        </div>
      )}

      {error && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-indigo-50 rounded-md"
            >
              <p className="text-sm text-gray-900">{suggestion}</p>
              <button
                onClick={() => onSuggestionApply(suggestion)}
                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Apply Suggestion
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;