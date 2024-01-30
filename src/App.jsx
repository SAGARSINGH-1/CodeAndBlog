import React, { useState, useEffect } from 'react'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CreatePost from './components/layout/CreatePost'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { AiOutlineStar, AiFillGithub } from 'react-icons/ai'
import LoadingComponent from '../src/components/layout/Loader.jsx';
import { Toaster } from 'react-hot-toast';



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

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
    <div className="flex justify-center overflow-hidden dark:bg-black dark:text-white">
      {isContentLoaded ? (
        <div className="">
          <div className="bg-orange-400 text-white p-2 ">
            <div className='max-w-7xl flex justify-between items-center mx-auto px-3'>
              <p className="text-[10px] md:text-base font-semibold">Star on GitHub, Make any contributions help us to improve this website!</p>
              <div className='github-icon social w-[25%] md:w-auto'>
                <NavLink target='_blank' to={'https://github.com/SAGARSINGH-1/CodeAndBlog'} className='text-sm p-[3px] cursor-pointer hover:text-black inline font-semibold border md:p-[5px] rounded-md hover:border-black'>
                  <span className='text-[10px] md:text-lg transition-all duration-300 hover:text-black'>Star on <AiFillGithub className='h-4 w-4 md:h-6 md:w-6 inline mb-1' /></span>
                </NavLink>
              </div>
            </div>
          </div>
          <Navbar />
          <main className='max-h-max'>
            <Outlet />
          </main>
          <CreatePost />
          <Footer />
        </div>
      ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}
      <div className=''>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </div>
  ) : null
}

export default App
