import React, { useEffect, useState } from 'react'
import { Category, Posts, TrendBlogs } from './BlogData'
import { CiSearch } from 'react-icons/ci';
import 'emoji-picker-element';
import { NavLink } from 'react-router-dom';
import Button from '../layout/Button';
import UserPost from './UserPost';
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
        <div className='max-w-6xl mx-auto'>
            {isContentLoaded ? (
                <div className='flex m-5 p-5 gap-5'>

                    {/* Block-1 */}
                    <div className=' w-[30vw]'>
                        <div className='bg-black text-white mb-5'>
                            <h2 className="font-Montserrat font-semibold p-3 ml-3">Categories</h2>
                        </div>
                        <div className='trend h-[70vh] overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
                            {
                                category.map((item) => (
                                    <div key={item.id} className='Category bg-slate-100 p-3.5 px-5 hover:bg-slate-200 cursor-pointer transition duration-300'>
                                        <h2 className='text-lg font-semibold'>{item.category}</h2>
                                        <p className='text-gray-600 text-sm ml-2'>{item.post} posts</p>
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
                    <div className='w-[80vw]'>

                        <div className='flex justify-between'>
                            <div className="bg-white mb-5 p-2 ml-10 rounded-full w-[30rem] flex border-2 border-gray-400" >
                                <div className='mt-1.5 mr-1'>
                                    <CiSearch size="2em" className='ml-3' />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className='mr-5'>
                                <div className="flex items-center justify-center">
                                    <select className="p-3 border border-gray-300 rounded-lg focus:outline-none">
                                        <option value="" disabled defaultValue>Filter Search</option>
                                        <option value="Username">Username</option>
                                        <option value="Blog">Blog</option>
                                        <option value="Comments">Comments</option>
                                    </select>
                                </div>
                            </div>
                        </div>



                        <div className=' h-[95vh] overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
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
