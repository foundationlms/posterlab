import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Beaker, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from './NotificationBell';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Beaker className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-slate-800">PosterLab</span>
            </Link>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Dash
                    </Link>
                    <Link to="/admin/users" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Users
                    </Link>
                    <Link to="/admin/tickets" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Tickets
                    </Link>
                    <Link to="/admin/knowledge" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      KB
                    </Link>
                    <Link to="/admin/sales" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Sales
                    </Link>
                    <Link to="/templates" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Builder
                    </Link>
                    <Link to="/archive" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Archive
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Dash
                    </Link>
                    <Link to="/templates" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Builder
                    </Link>
                    <Link to="/archive" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Archive
                    </Link>
                    <Link to="/support" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
                      Support
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell />
                <div className="relative">
                  <Link
                    to="/profile"
                    className="inline-flex items-center text-gray-700 hover:text-indigo-600"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;