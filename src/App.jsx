import React,{ useState,useEffect } from 'react'
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CreatePost from './components/layout/CreatePost'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'



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
        <Navbar onButtonClick={handleButtonClick}/>
        <main>
        <Outlet />
        </main>
        <CreatePost/>
        <Footer />
      </div>
      ) : (<LoadingBar color='#ff7c05' progress={progress} height = {3} onLoaderFinished={() => setProgress(0)}/>)}
      
      {!isContentLoaded && <p className="text-center text-gray-500 mt-5 absolute top-[40%]">Loading...</p>}
      <div className='absolute-0 right-0'>
            <ToastContainer />
        </div>
    </div>
  ) : null
}

export default App
