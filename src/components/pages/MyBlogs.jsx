import React from 'react';
import appwriteService from "../../appwrite/config";
import UserPost from "../userBlog/userPost";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import LoadingComponent from '../layout/Loader';

function MyBlogs() {
    const userData = useSelector((state) => state.auth.userData);

    const [mypost, setPost] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                // Filter posts by userid and update the state
                setPost(posts.documents.filter((post) => post.name === userData.userData.name));
            }
        });
    }, [userData.userData.name]);

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
        <div>
            {isContentLoaded ? (
                <div>
                    <Container>
                        <div className=' p-3 m-10'>
                            <div className='posts flex gap-10 flex-wrap'>
                                {mypost.map((post) => (
                                    <div className='bg-slate-100 rounded-lg w-[25vw]'>
                                        <UserPost key={post.id} {...post} />
                                    </div> 
                                ))}
                            </div>
                        </div>
                    
                    </Container>
                </div>
            ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}
        </div>
    );
}

export default MyBlogs;
