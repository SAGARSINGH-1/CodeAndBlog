import React, { useEffect, useState } from 'react'
import { Category, Posts, TrendBlogs } from '../Blog/BlogData'
import { CiSearch } from 'react-icons/ci';
import 'emoji-picker-element';
import { NavLink } from 'react-router-dom';
import Button from '../layout/Button';
import UserPost from '../layout/UserPost';
import Container from '../container/Container';
import appwriteService from "../../appwrite/config";
import LoadingBar from 'react-top-loading-bar'
import LoadingComponent from '../layout/Loader';


export default function UserBlog() {

    const [category, setCategory] = useState(Category);

    // For other component posts
    const [post, setPost] = useState([]);
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPost(posts.documents)
            }
        })
    }, [])


    const [trend, setTrend] = useState(TrendBlogs);

    // For Post upload
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    // For Emoji
    const [isTooltipShown, setIsTooltipShown] = useState(false);

    const toggleTooltip = () => {
        setIsTooltipShown((prev) => !prev);
    };


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
        <div className='max-w-6xl mx-auto dark:bg-black'>
            {isContentLoaded ? (
                <div className='flex md:m-5 md:p-5 md:gap-5'>

                    {/* Block-1 */}
                    <div className=' w-[30vw] hidden md:block'>
                        <div className='bg-black dark:bg-gray-100 dark:text-black text-white mb-5'>
                            <h2 className="font-Montserrat font-semibold p-3 ml-3">Categories</h2>
                        </div>
                        <div className='trend h-[70vh] overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
                            {
                                category.map((item) => (
                                    <div key={item.id} className='Category dark:bg-gray-900 bg-slate-100 p-3.5 px-5 dark:hover:bg-gray-700 hover:bg-slate-200 cursor-pointer transition duration-300'>
                                        <h2 className='text-lg font-semibold'>{item.category}</h2>
                                        <p className='text-gray-600 dark:text-gray-300 text-sm ml-2'>{item.post} posts</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mt-[9vh] flex justify-center">
                            <NavLink to='/add-post'>
                                <Button className=" w-28 text-xl font-bold py-2 px-4">Post</Button>
                            </NavLink>
                        </div>
                    </div>

                    {/* Block-2 */}
                    <div className='md:w-[80vw]'>

                        <div className='flex md:justify-between pt-4 w-[100vw] md:w-auto'>
                            <div className="bg-white dark:bg-black mb-5 md:p-2 p-1 mx-2 md:ml-10 rounded-full w-[30rem] flex border-2 border-gray-400" >
                                <div className='md:mt-1.5 md:mr-1'>
                                    <CiSearch size="2em" className='text-[.7rem] mt-[3px] mr-1 md:text-xl md:ml-3' />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="md:w-full dark:bg-black md:px-4 md:py-2 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className='mr-5 hidden md:block'>
                                <div className="flex items-center justify-center">
                                    <select className="p-2 md:p-3 dark:bg-black border border-gray-300 rounded-lg focus:outline-none">
                                        <option value="" disabled defaultValue>Filter Search</option>
                                        <option value="Username">Username</option>
                                        <option value="Blog">Blog</option>
                                        <option value="Comments">Tags</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        {/* To Diplay all other users blog which is in active state */}
                        <div className='h-[95vh] m-3 overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
                            <Container>
                                <div className='posts'>
                                    {post.slice().reverse().map((item) => (
                                        <UserPost key={item.id}  {...item} />
                                    ))}
                                </div>
                            </Container>
                        </div>

                    </div>

                </div>
            ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}

        </div>
    )
}
