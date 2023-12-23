import HashLoader from "react-spinners/HashLoader"; 
import LoadingBar from 'react-top-loading-bar'

const LoadingComponent = ({ isContentLoaded, progress, setProgress }) => {
  return (
    <>
      {isContentLoaded ? (
        ""
      ) : (
        <div>
            <div className='flex justify-center items-center h-[90vh]'>
              <HashLoader color="#f97316" />
            </div>
        </div>
      
      )}
    </>
  );
};

export default LoadingComponent;