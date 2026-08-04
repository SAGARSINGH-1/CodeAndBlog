import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../layout/Button';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-orange-500 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/blogs">
          <Button className="bg-gray-700">Browse blogs</Button>
        </Link>
      </div>
    </div>
  );
}
