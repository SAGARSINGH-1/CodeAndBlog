import React, { useEffect, useState } from 'react';
import appwriteService from '../../appwrite/config';
import UserPost from '../layout/UserPost';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';

function MyBlogs() {
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?._id;

  const [mypost, setPost] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    // Prefer server-side filter by userid
    appwriteService
      .getPosts({ userid: userId, status: 'all' })
      .then((posts) => {
        if (posts?.documents) {
          setPost(posts.documents);
        }
      })
      .catch(() => {
        // Fallback: fetch all and filter client-side
        appwriteService.getPosts({ status: 'all' }).then((posts) => {
          if (posts?.documents) {
            setPost(
              posts.documents.filter(
                (p) => String(p.userid) === String(userId) || p.name === userData.name
              )
            );
          }
        });
      })
      .finally(() => setLoading(false));
  }, [userId, userData?.name]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setContentLoaded(true), 600);
    const intervalId = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 40) + 1, 100));
    }, 200);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  if (!isContentLoaded || loading) {
    return (
      <div className="flex flex-row gap-10 md:m-3 h-[70vh] overflow-visible">
        {[1, 2, 3].map((i) => (
          <div key={i} className="max-w-max bg-gray-200 p-5 dark:bg-gray-800">
            <div className="flex gap-3 py-3">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width={210} height={35} sx={{ fontSize: '1rem' }} />
            </div>
            <Skeleton variant="rectangular" width={300} height={180} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {mypost.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh] overflow-visible">
          <p className="text-center font-semibold text-2xl text-gray-500 top-[40%]">
            You Didn&apos;t Post Anything Yet!{' '}
            <NavLink to="/add-post">
              <span className="text-orange-400 underline underline-offset-4">Post Now</span>
            </NavLink>
          </p>
        </div>
      ) : (
        <Container>
          <div className="p-3">
            <div className="posts grid gap-10 md:grid-cols-3">
              {mypost.map((post) => (
                <div key={post._id || post.slug} className="rounded-lg">
                  <UserPost {...post} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default MyBlogs;