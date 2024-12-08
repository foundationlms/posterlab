import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Edit2, Trash2, Copy, Eye, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getStoredPosters, deletePoster, savePosterToStorage, exportPoster } from '../utils/posterActions';
import { PosterData } from '../types/poster';
import { format } from 'date-fns';
import PreviewModal from '../components/PreviewModal';
import PosterCanvas from '../components/PosterCanvas';

const Archive = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posters, setPosters] = useState<PosterData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoster, setSelectedPoster] = useState<PosterData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const exportContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    loadPosters();
  }, []);

  const loadPosters = () => {
    const storedPosters = getStoredPosters();
    setPosters(storedPosters);
  };

  const handleEdit = (poster: PosterData) => {
    navigate('/builder', { 
      state: { 
        editMode: true,
        posterId: poster.id,
        poster: poster
      }
    });
  };

  const handleDuplicate = async (poster: PosterData) => {
    try {
      const newPoster = {
        ...poster,
        id: Math.random().toString(36).substr(2, 9),
        title: `${poster.title} (Copy)`,
        lastModified: new Date().toISOString(),
      };
      await savePosterToStorage(newPoster);
      loadPosters();
    } catch (error) {
      console.error('Failed to duplicate poster:', error);
    }
  };

  const handleDelete = async (posterId: string) => {
    if (window.confirm('Are you sure you want to delete this poster?')) {
      try {
        await deletePoster(posterId);
        loadPosters();
      } catch (error) {
        console.error('Failed to delete poster:', error);
      }
    }
  };

  const handleExport = async (poster: PosterData) => {
    if (!exportContainerRef.current) return;
    setIsExporting(true);

    try {
      // Clear previous content
      exportContainerRef.current.innerHTML = '';

      // Create a container for the poster
      const container = document.createElement('div');
      container.style.width = '1200px';
      container.style.backgroundColor = 'white';
      exportContainerRef.current.appendChild(container);

      // Render the poster
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(container);
      root.render(
        <PosterCanvas
          template={poster.template}
          elements={poster.elements}
          onElementsChange={() => {}}
          styles={poster.styles || {
            fontFamily: 'Inter, sans-serif',
            titleColor: '#1a365d',
            headingColor: '#2d3748',
            textColor: '#4a5568',
            backgroundColor: '#ffffff',
            accentColor: '#3182ce',
          }}
        />
      );

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Export
      await exportPoster(container);

      // Cleanup
      root.unmount();
      exportContainerRef.current.innerHTML = '';
    } catch (error) {
      console.error('Failed to export poster:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredPosters = posters.filter(poster =>
    poster.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Archive</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your scientific posters
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => navigate('/builder')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Poster
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0 max-w-md">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search posters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosters.map((poster) => (
                    <tr key={poster.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{poster.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{poster.template.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {format(new Date(poster.lastModified), 'MMM d, yyyy')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedPoster(poster);
                              setShowPreview(true);
                            }}
                            className="text-gray-400 hover:text-gray-500"
                            title="Preview"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(poster)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(poster)}
                            className="text-gray-400 hover:text-gray-500"
                            title="Duplicate"
                          >
                            <Copy className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleExport(poster)}
                            disabled={isExporting}
                            className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
                            title="Download"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(poster.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPosters.length === 0 && (
                <div className="text-center py-12">
                  <Plus className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No posters</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating your first poster
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => navigate('/builder')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Poster
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedPoster && (
        <PreviewModal
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedPoster(null);
          }}
          poster={selectedPoster}
          previewRef={exportContainerRef}
        />
      )}

      {/* Hidden container for exports */}
      <div ref={exportContainerRef} className="hidden" />
    </div>
  );
};

export default Archive;