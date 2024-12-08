import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, Download, Edit2, Trash2, Copy, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getStoredPosters, deletePoster, savePosterToStorage } from '../utils/posterStorage';
import { PosterData } from '../types/poster';
import { exportPoster } from '../utils/posterActions';
import { format } from 'date-fns';
import PreviewModal from '../components/PreviewModal';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posters, setPosters] = useState<PosterData[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<PosterData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '1200px';
    document.body.appendChild(container);

    try {
      const PosterCanvas = (await import('../components/PosterCanvas')).default;
      const root = document.createElement('div');
      container.appendChild(root);

      const { createRoot } = await import('react-dom/client');
      const reactRoot = createRoot(root);
      reactRoot.render(
        <PosterCanvas
          template={poster.template}
          elements={poster.elements}
          onElementsChange={() => {}}
          styles={poster.styles}
        />
      );

      await new Promise(resolve => setTimeout(resolve, 100));
      await exportPoster(container);

      reactRoot.unmount();
      document.body.removeChild(container);
    } catch (error) {
      console.error('Failed to export poster:', error);
      document.body.removeChild(container);
    }
  };

  const getPlanLimit = () => {
    switch (user?.plan) {
      case 'free':
        return 1;
      case 'standard':
      case 'pro':
        return 100;
      default:
        return 0;
    }
  };

  const postersRemaining = getPlanLimit() - (user?.postersCreated || 0);
  const canCreatePoster = postersRemaining > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Plan Status */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {user?.plan} Plan
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {postersRemaining} posters remaining
              </p>
            </div>
            {user?.plan === 'free' && (
              <button
                onClick={() => navigate('/pricing')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Create New Poster Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="px-8 py-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Create Your Next Scientific Poster</h2>
            <p className="text-indigo-100 mb-8">
              Choose from our professional templates and create stunning academic posters in minutes.
            </p>
            {canCreatePoster ? (
              <button
                onClick={() => navigate('/builder')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Poster
              </button>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      You've reached your plan's poster limit. 
                      <a href="/pricing" className="font-medium underline ml-1">
                        Upgrade your plan
                      </a>
                      {' '}to create more posters.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Poster Archive */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Posters</h3>
        </div>
        <div className="overflow-x-auto">
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
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posters.map((poster) => (
                <tr key={poster.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{poster.title}</div>
                    <div className="text-sm text-gray-500">{poster.template.orientation}</div>
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
                        className="text-gray-400 hover:text-gray-500"
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

          {posters.length === 0 && (
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

      {selectedPoster && (
        <PreviewModal
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedPoster(null);
          }}
          poster={selectedPoster}
          previewRef={previewRef}
        />
      )}
    </div>
  );
};

export default Dashboard;