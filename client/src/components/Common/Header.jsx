import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = '#',
}) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className='flex justify-between items-center'>
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {heading}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">
          {paragraph}
          {
            linkUrl
              ? (
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                  {linkName}
                </Link>
              ) : null
          }
        </p>
      </div>
      <div className='ml-auto'>
        {isAuthenticated && (
          <button
            className="text-purple-500 px-4 py-2 rounded-md border border-purple-500"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
