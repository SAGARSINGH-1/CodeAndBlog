import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import PostForm from '../../postForm/PostForm'
import LoadingBar from 'react-top-loading-bar'

function AddPost() {

   // top Loader
const [isContentLoaded, setContentLoaded] = useState(false);
const [progress, setProgress] = useState(0);
useEffect(() => {
  const timeoutId = setTimeout(() => {
    setContentLoaded(true);
  }, 2000);

  const intervalId = setInterval(() => {
    setProgress((prevProgress) => {
      const randomIncrement = Math.floor(Math.random() * 50) + 1;
      const newProgress = Math.min(prevProgress + randomIncrement, 100);
      return newProgress;
    });
  }, 300);

  // Clean up the timeout and interval when the component unmounts
  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
}, []);
    

  return (
    <div className='py-8'>
       {isContentLoaded ? (
        <Container>
            <PostForm />
        </Container>
         ) : (<LoadingBar color='#ff7c05' progress={progress} height = {3} onLoaderFinished={() => setProgress(0)}/>)}

         {!isContentLoaded && <p className="text-center text-gray-500 mt-5 absolute top-[40%]">Loading...</p>}
    </div>
  )
}

export default AddPost