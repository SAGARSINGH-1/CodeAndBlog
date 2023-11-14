import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CreatePost from './components/layout/CreatePost'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  const authcheck = useSelector((state) => state.auth.isChecked)                          
  const togglecheck = () => {
    dispatch(changeCheck());
  };

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
  
  return !loading ? (
    <div className="flex justify-center overflow-hidden">
      <div className={`${authcheck ? 'bg-black text-gray-500' : 'bg-white'}`}>
        <Navbar />
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
