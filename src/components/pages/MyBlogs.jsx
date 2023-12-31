import React from 'react';
import appwriteService from "../../appwrite/config";
import UserPost from "../userBlog/UserPost";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import LoadingComponent from '../layout/Loader';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';

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
                    {mypost.length === 0 ? (
                        <div className='flex justify-center items-center h-[70vh]'>
                            <p className="text-center font-semibold text-2xl text-gray-500 top-[40%]">You Didn't Post Anything Yet! <NavLink to={'/add-post'}><span className='text-orange-400 underline underline-offset-4'>Post Now</span></NavLink> </p>
                        </div>

                    ) : (
                        <Container>
                            <div className='p-3'>
                                <div className='posts grid gap-10 grid-cols-3'>
                                    {mypost.map((post) => (
                                        <div key={post.id} className='rounded-lg'>
                                            <UserPost {...post} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Container>
                    )}
                </div>
            ) : (<div className='flex gap-10'>
                {mypost.slice(0, 3).map((post) => (
                    <div key={post.id} className='w-[20rem] bg-gray-200 p-5'>
                        <div className='flex gap-3 py-3'>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" width={210} height={35} sx={{ fontSize: '1rem' }} />
                        </div>

                        <div className='px-5'>
                            <Skeleton variant="text" height={35} sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" height={35} sx={{ fontSize: '1rem' }} />
                        </div>

                        <div className='p-3'>
                            <Skeleton variant="rounded" width={250} height={170} />
                        </div>
                    </div>
                ))}
            </div>)}
        </div>
    );
}

export default MyBlogs;
