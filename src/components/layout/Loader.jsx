import HashLoader from "react-spinners/HashLoader"; 
import LoadingBar from 'react-top-loading-bar'

const LoadingComponent = ({ isContentLoaded, progress, setProgress }) => {
  return (
    <>
      {isContentLoaded ? (
        ""
      ) : (
        <div>
            <LoadingBar color='white ' progress={progress} height={3} onLoaderFinished={() => setProgress(0)} />
            <div className='flex justify-center items-center h-[70vh]'>
              <HashLoader color="#f97316" />
            </div>
        </div>
      
      )}
    </>
  );
};

export default LoadingComponent;