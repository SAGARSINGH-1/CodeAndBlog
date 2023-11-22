import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { FaUserSecret } from "react-icons/fa6";

import appwriteService from "../../appwrite/config"
import {Link} from 'react-router-dom'
import parse from "html-react-parser";


function Post({$id, title, featuredImage,name, content}) {

    const [showMoreMap, setShowMoreMap] = useState({});

    const description = parse(content);

    // Show more
    // const toggleShowMore = (itemId) => {
    //     setShowMoreMap((prevShowMoreMap) => ({
    //       ...prevShowMoreMap,
    //       [itemId]: !prevShowMoreMap[itemId],
    //     }));
    //   };


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
    
                        <div key={$id} className='Category bg-slate-100 p-3 hover:bg-slate-200 cursor-pointer transition duration-300 mb-3'>
                            <Link to={`/post/${$id}`}>
                                <div className='user flex justify-between items-center'>
                                    <div className='flex flex-row items-center'>
                                        <div className='flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center'>
                                            <FaUserSecret size="1.5em"/>
                                        </div>
                                        <div>
                                            <h2 className='ml-3 font-medium'>{name ? name : 'Xavier'}</h2>
                                            <h2 className='ml-4 text-sm text-gray-500'>{}</h2>
                                        </div>
                                    </div>
                                   
                                    <div>
                                        <h1 className='text-sm items-center'>{randomMonthName} {randomDate}</h1>
                                    </div>
                                </div>

                                <div className='content'>
                                    <div className='px-5 py-3 '>
                                        <div className="text-xl font-semibold text-black pb-2">
                                            <h1>{title}</h1>
                                        </div>
                                        <div className='text-gray-500 text-sm'>
                                            {/* It show text written by user */}
                                        {/* {showMoreMap[item.id] ? (
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
                                        )} */}
                                            <p>{description}</p>
                                        </div>
                                        
                                    </div>
                                    <div className='p-5 mx-auto'>
                                        <img className="w-full h-full object-cover rounded-lg bg-white"  src={appwriteService.getFilePreview(featuredImage)} alt="img" />
                                    </div>
                                </div>
                                
                            </Link>

                                <div className='btns flex justify-around'>
                                    <div onClick={handleClick}  className='flex cursor-pointer hover:text-orange-500'>
                                        {isHeartFilled ? (<FaHeart color='#FF5733' size="1.1em" className='mt-0.5' />) : (<AiOutlineHeart size="1.2em" className='mt-0.5' />)} <p className='text-gray-500 ml-1.5'>{randomNumber}</p>
                                    </div>
                                    <div className='flex cursor-pointer hover:text-orange-500'>
                                        <FiMessageSquare size="1.2em" className='mt-0.5 '/><p className='text-gray-500 ml-1'>{randomComment + 1}</p>
                                    </div>
                                    <div className='cursor-pointer hover:text-orange-500'>
                                        <FiShare2 size="1.1em" className='mt-0.5'/>
                                    </div>
                                </div>
                            </div>
   
  )              
}

export default Post;
