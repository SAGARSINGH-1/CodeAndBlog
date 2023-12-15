import React from 'react';
import LoadingBar from 'react-top-loading-bar'

const LoadingComponent = ({ isContentLoaded, progress, setProgress }) => {
  return (
    <>
      {isContentLoaded ? (
        ""
      ) : (
        <div>
            <LoadingBar color='#fe5a1d' progress={progress} height={3} onLoaderFinished={() => setProgress(0)} />
            <p className="text-center text-gray-500 mt-5 absolute top-[40%]">Loading...</p>
        </div>
      
      )}
    </>
  );
};

export default LoadingComponent;