import React, { useEffect,  useState } from 'react'
import { Category, Posts, TrendBlogs } from './BlogData'
import { CiSearch } from 'react-icons/ci';
import 'emoji-picker-element';
import { NavLink } from 'react-router-dom';
import Button from '../layout/Button';
import Post from './userPost';
import Container from '../container/Container';
import appwriteService from "../../appwrite/config";
import LoadingBar from 'react-top-loading-bar'


export default function UserBlog() {

    const[category , setCategory] = useState(Category);

    // For other component posts
    const[post , setPost] = useState([]);
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPost(posts.documents)
            }
        })
    }, [])
    
    
    const[trend , setTrend] = useState(TrendBlogs);
    
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
        <div className='w-[45vw] h-[95vh] overflow-y-scroll overflow-x-hidden scrollbar-none no-scrollbar'>
            <Container>
                <div className='posts'>
                    {console.log(post)}
                    {post.slice().reverse().map((item) => (
                        <Post key={item.id}  {...item} />
                        ))}
                </div>
            </Container>
        </div>

        {/* Block-3 */}
        <div className='w-[30vw]'>
            <div className="bg-white mb-5 p-2 rounded-full flex border-2 border-gray-400" >
                <div className='mt-1.5 mr-1'>
                    <CiSearch size="2em" className='ml-3'/>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
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
                                            <h1 className="text-sm font-medium">{item.title}</h1>
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
       ) : (<LoadingBar color='#ff7c05' progress={progress} height = {3} onLoaderFinished={() => setProgress(0)}/>)}

       {!isContentLoaded && <p className="text-center text-gray-500 mt-5 absolute top-[40%]">Loading...</p>}
    </div>
  )
}
