import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { FiMessageSquare, FiShare2 } from 'react-icons/fi';

function Post({ item }) {

    const [showMoreMap, setShowMoreMap] = useState({});

    // Show more
    const toggleShowMore = (itemId) => {
        setShowMoreMap((prevShowMoreMap) => ({
          ...prevShowMoreMap,
          [itemId]: !prevShowMoreMap[itemId],
        }));
      };


      //For like dislike
        const [isHeartFilled, setIsHeartFilled] = useState(false);
        const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 30) + 1);

        const handleClick = () => {
            setRandomNumber(isHeartFilled ? randomNumber - 1 : randomNumber + 1);
              setIsHeartFilled(!isHeartFilled);
        };

    // For Comment
    const [randomComment, setRandomComment] = useState(Math.floor(Math.random() * 30) + 1);
    
  return (
   
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
