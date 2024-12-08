import React, { useState } from 'react';
import { X, Copy, Mail, Link2 } from 'lucide-react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  posterId: string;
  posterTitle: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, onClose, posterId, posterTitle }) => {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/shared/${posterId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to copy link'
      });
    }
  };

  const handleEmailShare = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    try {
      // In a real app, this would call your backend API
      // await api.sharePoster(posterId, email);
      
      setStatus({
        type: 'success',
        message: 'Share invitation sent successfully!'
      });
      setEmail('');
      
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send share invitation'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
              <Link2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Share "{posterTitle}"
              </h3>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Copy Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share Link
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="block w-full rounded-none rounded-l-md border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  onClick={handleCopyLink}
                  className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Email Share */}
            <div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">Or</span>
                </div>
              </div>

              <form onSubmit={handleEmailShare} className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share via Email
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>

            {/* Status Messages */}
            {status && (
              <div className={`rounded-md p-4 ${
                status.type === 'success' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className={`text-sm ${
                  status.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {status.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;