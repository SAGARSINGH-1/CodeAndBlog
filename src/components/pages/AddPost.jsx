import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import PostForm from '../layout/PostForm'
import LoadingBar from 'react-top-loading-bar'
import LoadingComponent from '../layout/Loader';

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
         ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}
    </div>
  )
}

export default AddPost