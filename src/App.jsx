import React,{ useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CreatePost from './components/layout/CreatePost'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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
      <div className=''>
        <Navbar />
        <main>
        <Outlet />
        </main>
        <CreatePost/>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
