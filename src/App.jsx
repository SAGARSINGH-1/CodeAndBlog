import React,{ useState,useEffect } from 'react'
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CreatePost from './components/layout/CreatePost'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import {AiOutlineStar, AiFillGithub} from 'react-icons/ai'
import LoadingComponent from '../src/components/layout/Loader.jsx';



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  // Toggle Dark Mode
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = (isActive) => {
    setIsActive(isActive);
  };

  
  // top Loader
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContentLoaded(true);
    }, 3000);
  
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const randomIncrement = Math.floor(Math.random() * 50) + 1;
        const newProgress = Math.min(prevProgress + randomIncrement, 100);
        return newProgress;
      });
    }, 500);
  
    // Clean up the timeout and interval when the component unmounts
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);
  
  return !loading ? (
    <div className="flex justify-center overflow-hidden">
      {isContentLoaded ? (
      <div className={`${isActive ? 'bg-black text-gray-500' : 'bg-white'}`}>
        <div className="bg-orange-400 text-white p-2 ">
          <div className='max-w-7xl flex justify-between items-center mx-auto px-3'>
            <p className="text-base font-semibold">Star on GitHub, Make any contributions help us to improve this website!</p>
            <div className='social'>
                <NavLink target='_blank' to={'https://github.com/SAGARSINGH-1/CodeAndBlog'} className='cursor-pointer hover:text-black inline font-semibold border p-[5px] rounded-md hover:border-black'>
                  <span className='transition-all duration-300 hover:text-yellow-200'><AiOutlineStar className='inline mb-1 text-xl mx-1' /></span><span className='transition-all duration-300 hover:text-black'>Star on <AiFillGithub className='h-6 w-6 inline mb-1' /></span> 
                </NavLink>
            </div>
          </div>
        </div>
        <Navbar onButtonClick={handleButtonClick}/>
        <main className='min-h-screen'>
        <Outlet />
        </main>
        <CreatePost/>
        <Footer />
      </div>
      ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}
      
      
      <div className='absolute-0 right-0'>
            <ToastContainer />
        </div>
    </div>
  ) : null
}

export default App
