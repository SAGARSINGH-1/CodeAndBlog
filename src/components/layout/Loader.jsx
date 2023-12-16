
import LoadingBar from 'react-top-loading-bar'

const LoadingComponent = ({ isContentLoaded, progress, setProgress }) => {
  return (
    <>
      {isContentLoaded ? (
        ""
      ) : (
        <div>
            <LoadingBar color='#666699 ' progress={progress} height={3} onLoaderFinished={() => setProgress(0)} />
            <div className='flex justify-center items-center h-[70vh]'>
              <p className="font-bold text-center text-gray-500 top-[40%]">Loading...</p>
            </div>
        </div>
      
      )}
    </>
  );
};

export default LoadingComponent;