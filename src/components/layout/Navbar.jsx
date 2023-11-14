import React from 'react'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useState } from 'react'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { changeCheck } from '../../store/authSlice'

export default function Navbar() {
  const authStatus = useSelector((state) => state.auth.status)
  const authcheck = useSelector((state) => state.auth.isChecked)

  const dispatch = useDispatch();                           

  const togglecheck = () => {
    dispatch(changeCheck());
  };
  

  return (
    <div>
      <nav className={`p-3 w-[100vw]`}>
        <div className='flex justify-between max-w-6xl mx-auto'>
          <div className='img mt-2'>
            LOGO
          </div>

          <div className='link'>
            <ul className='flex gap-10 text-base font-medium mt-2 poppins text-gray-500'>
              <li className='hover:text-pink-400 cursor-pointer'> <NavLink to=''>Home</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/blogs'}>Blogs</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/about'}>About</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={"/contact"}>Contact Us</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/help'}>Help</NavLink></li>
            </ul>
          </div>

          <div className='flex items-center'>
          {/* Dark mode toggle button */}
            <div className='inline-block mt-1 mr-3 md:right-[12rem] sm:right-[13rem] lg:right-[20rem]'>
              <div className={`relative inline-block w-10 h-6 ${authcheck ? 'bg-gray-300' : 'bg-black'} rounded-full cursor-pointer`} onClick={togglecheck}>
                {/* Thumb */}
                <div className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${authcheck ? 'translate-x-full' : 'translate-x-0'}`}> {authcheck ? <BsFillMoonStarsFill size="0.9rem" className='mt-1 ml-1.5 text-black'/>:  <BsSunFill size="0.9rem" className='mt-1 ml-1.5' />}</div>
                {/* Input */}
                <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer" checked={authcheck} onChange={() => {}} aria-label="Dark mode toggle" />
              </div>
            </div>

            {/* Sign-up or Logout button */}
            <div className='ml-4'>
              {
                authStatus ? (
                  <NavLink to='/'><LogoutBtn /></NavLink>
                ) : (<NavLink to='signup'><Button type="submit" className="w-full">
                  Signup
                </Button></NavLink>)
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
