import React from 'react';

function Error(){
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-700 dark:text-white">404</h1>
        <p className="text-2xl font-semibold text-gray-600 dark:text-white">Page Not Found</p>
      </div>
    </div>
  );
};

export default Error;
