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
  
  return !loading ? (
    <div className="flex justify-center overflow-hidden">
      <div className={`${isActive ? 'bg-black text-gray-500' : 'bg-white'}`}>
        <Navbar onButtonClick={handleButtonClick}/>
        <main>
        <Outlet />
        </main>
        <CreatePost/>
        <Footer />
      </div>
      <div className='absolute-0 right-0'>
            <ToastContainer />
        </div>
    </div>
  ) : null
}

export default App
