import React,{ useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import {authService} from './appwrite/auth';
import {login,logout} from './store/authSlice';
import Home from './components/Home/Home';
import SignupForm from './registration/Signup';
import LoginForm from './registration/Login';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);



  return (
    <div className="flex justify-center overflow-hidden">
      <div>
      <Navbar />
      <Outlet />
      <Footer />
      </div>
    </div>
  )
}

export default App
