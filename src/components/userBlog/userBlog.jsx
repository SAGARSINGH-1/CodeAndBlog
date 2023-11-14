import React, { useEffect } from 'react'
import { useState } from 'react'
import { Category, Posts, TrendBlogs } from './BlogData'

import { AiOutlineHeart } from 'react-icons/ai';
import { FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { FaRegSmileWink, FaHeart } from 'react-icons/fa';

import 'emoji-picker-element';
import { NavLink } from 'react-router-dom';
import Button from '../layout/Button';

export default function UserBlog() {

    const[category , setCategory] = useState(Category);
    const[post , setPost] = useState(Posts);
    
    const[trend , setTrend] = useState(TrendBlogs);
    
    const [showMoreMap, setShowMoreMap] = useState({});

    // Show more
    const toggleShowMore = (itemId) => {
        setShowMoreMap((prevShowMoreMap) => ({
          ...prevShowMoreMap,
          [itemId]: !prevShowMoreMap[itemId],
        }));
      };


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

    //For like
    const randomNumber = Math.floor(Math.random() * 30) + 1;

    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

  return (
    <div className='max-w-6xl mx-auto'>
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
        <div className='w-[45vw] h-[95vh] overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
            <div className='posts'>
                {
                    post.map((item)=>{
                        return(
                            <div key={item.id} className='Category bg-slate-100 p-3 hover:bg-slate-200 cursor-pointer transition duration-300 mb-3'>
                                <div className='user flex items-center'>
                                    <div className='flex-shrink-0'>
                                        <img className='w-10 h-10 rounded-full' src={item.userimg} alt="User" />
                                    </div>
                                    <div>
                                        <h2 className='ml-3 font-medium'>{item.username}</h2>
                                        <h2 className='ml-4 text-sm text-gray-500'>{item.category}</h2>
                                    </div>
                                </div>

                                <div className='content'>
                                    <div className='px-5 py-3'>
                                        {showMoreMap[item.id] ? (
                                            <p>
                                            {item.posttext}{' '}
                                            {item.posttext.split(' ').length > 20 && (
                                                <span onClick={() => toggleShowMore(item.id)}  className='text-blue-500 cursor-pointer'>show less</span>
                                            )}
                                            </p>
                                        ) : (
                                            <p>
                                            {item.posttext.split(' ').slice(0, 20).join(' ')}{' '}
                                            {item.posttext.split(' ').length > 20 && (
                                                <span
                                                onClick={() => toggleShowMore(item.id)} className='text-blue-500 cursor-pointer'>... show more</span>
                                            )}
                                            </p>
                                        )}
                                    </div>
                                    <div className='p-5 w-[30vw] h-[30vh] mx-auto'>
                                        <img className="w-full h-full object-cover rounded-lg" src={item.postimg} alt="img" />
                                    </div>
                                </div>

                                <div className='btns flex justify-around'>
                                    <div onClick={handleClick}  className='flex cursor-pointer hover:text-orange-500'>
                                    {isHeartFilled ? (<FaHeart color='#FF5733' size="1.1em" className='mt-0.5' />) : (<AiOutlineHeart size="1.2em" className='mt-0.5' />)} <p className='text-gray-500 ml-1.5'>{randomNumber}</p>
                                    </div>
                                    <div className='flex cursor-pointer hover:text-orange-500'>
                                        <FiMessageSquare size="1.2em" className='mt-0.5 '/><p className='text-gray-500 ml-1'>{randomNumber + 4 + randomNumber}</p>
                                    </div>
                                    <div className='cursor-pointer hover:text-orange-500'>
                                        <FiShare2 size="1.1em" className='mt-0.5'/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        {/* Block-3 */}
        <div className='w-[30vw]'>
            <div class="bg-white mb-5 p-2 rounded-full flex border-2 border-gray-400" >
                <div className='mt-1.5 mr-1'>
                    <CiSearch size="2em" className='ml-3'/>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    class="w-full px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <div className='bg-black text-white mb-5'>
                    <h2 className="font-Montserrat font-semibold p-3 ml-3">Popular Blogs</h2>
                </div>
                <div className='h-[75vh] overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
                    {
                        trend.map((item)=>{
                            return(
                                    <div key={item.id} className='blog flex bg-slate-100 hover:bg-slate-200 hover:cursor-pointer mb-2 w-[25vw]' >
                                       <div className='img relative h-[12vh] w-[12vw]'>
                                            <img className='w-full h-full object-cover hover:scale-105 transition duration-300 ' src={item.img} alt="blog"/>
                                        </div>
                                        <div className='ml-3 p-3'>
                                            <h1 className="text-sm ">{item.title}</h1>
                                            <div className='text-xs text-gray-400 flex justify-between mt-3'>
                                                <p>{item.author}</p>
                                                <p>{item.date}</p>
                                            </div>
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}
