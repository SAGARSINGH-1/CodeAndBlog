import React, { useEffect, useState } from 'react';
import Container from '../container/Container';
import PostForm from '../layout/PostForm';
import LoadingComponent from '../layout/Loader';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AddPost() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);

  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => setContentLoaded(true), 400);
    const intervalId = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 40) + 1, 100));
    }, 150);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  if (!authStatus || !userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="py-8">
      {isContentLoaded ? (
        <Container>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 px-4">Create a new post</h1>
          <PostForm />
        </Container>
      ) : (
        <LoadingComponent
          isContentLoaded={isContentLoaded}
          progress={progress}
          setProgress={setProgress}
        />
      )}
    </div>
  );
}

export default AddPost;