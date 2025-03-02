import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { FaUserSecret } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import appwriteService from "../../appwrite/config"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";
import { CiEdit } from "react-icons/ci";


function UserPost({ $id, title, featuredImage, name, content, profileImageId }) {

    const [showMoreMap, setShowMoreMap] = useState({});

    const description = parse(content);

    // for edit
    const userData = useSelector((state) => state.auth.userData.userData);

    //For like dislike
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 30) + 1);

    const handleClick = () => {
        setRandomNumber(isHeartFilled ? randomNumber - 1 : randomNumber + 1);
        setIsHeartFilled(!isHeartFilled);
    };

    // For Comment
    const [randomComment, setRandomComment] = useState(Math.floor(Math.random() * 30) + 1);

    function getRandomMonthName() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const randomIndex = Math.floor(Math.random() * months.length);
        return months[randomIndex];
    }

    // Usage
    const [randomMonthName, setRandomMonthName] = useState(getRandomMonthName());
    const randomDate = useState(Math.floor(Math.random() * 30) + 1);


    return (

        <div key={$id} className='Category bg-slate-100 dark:bg-gray-900 p-2 md:p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition duration-300 mb-5'>
            <Link to={`/post/${$id}`}>
                <div className='user flex justify-between items-center'>
                    <div className='flex flex-row items-center'>
                        <div className='flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-white flex justify-center items-center'>
                            <img src={appwriteService.getProfilePreview(profileImageId)} className="rounded-full" alt="" srcset="" />
                        </div>
                        <div>
                            <h2 className='ml-3 font-medium'>{name ? name : 'Xavier'}</h2>
                            <h2 className='ml-4 text-sm text-gray-500'>{ }</h2>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-sm items-center inline'>{
                            userData.name === name
                                ? (<Link to={`/edit-post/${$id}`}><CiEdit className='inline text-2xl mr-2 text-orange-500 mb-1 hover:scale-110' /></Link>)
                                : null
                        }{randomMonthName} {randomDate}</h1>
                    </div>
                </div>

                <div className='content'>
                    <div className='px-10 py-3 '>
                        <div className="text-xl font-semibold dark:text-white text-black pb-2">
                            <h1>{title}</h1>
                        </div>
                        <div className='text-gray-500 text-sm'>
                            <p>{description}</p>
                        </div>

                    </div>
                    <div className='p-5'>
                        <img className="w-[40rem] mx-auto h-full object-cover rounded-lg bg-white" src={appwriteService.getFilePreview(featuredImage)} alt="img" loading="lazy" />
                    </div>
                </div>

            </Link>

            <div className='btns flex justify-around'>
                <div onClick={handleClick} className='flex cursor-pointer hover:text-orange-500'>
                    {isHeartFilled ? (<FaHeart color='#FF5733' size="1.1em" className='mt-0.5' />) : (<AiOutlineHeart size="1.2em" className='mt-0.5' />)} <p className='text-gray-500 ml-1.5'>{randomNumber}</p>
                </div>

                <Link to={`/post/${$id}`}>
                    <div className='flex cursor-pointer hover:text-orange-500'>
                        <FiMessageSquare size="1.2em" className='mt-0.5 ' /><p className='text-gray-500 ml-1'>{randomComment + 1}</p>
                    </div>
                </Link>

                <div className='cursor-pointer hover:text-orange-500'>
                    <FiShare2 size="1.1em" className='mt-0.5' />
                </div>
            </div>
        </div>

    )
}

export default UserPost;
