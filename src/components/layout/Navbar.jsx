import React from 'react'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import { useState } from 'react'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { IoReorderThree } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function Navbar({ onButtonClick }) {
  const authStatus = useSelector((state) => state.auth.status)
  const [ShowNav, setShowNav] = useState(false)
 
  // Toggle Dark Mode
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
    onButtonClick(!isActive);
  };

  const userData=useSelector((state)=>state.auth.userData)

  // Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  return (
    <div>
      <nav className={`relative p-3 w-[100vw] z-10`}>
        <div className=' flex flex-col justify-between md:flex-row md:justify-between md:max-w-6xl md:mx-auto'>
          <div className='img flex items-center'>
            <img className='h-7 max-w-max' src={isActive ? "../Logo.png" : "../Logo d.png"} alt="logo" />
          </div>

          <div className={`link flex justify-center items-center w-[100%] ${ShowNav?"hidden":""}`}>
            <ul className='flex-col gap-4 md:flex-row flex md:gap-10 text-base font-medium mt-2 poppins text-gray-500'>
              <li className='hover:text-pink-400 cursor-pointer'> <NavLink to=''>Home</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/blogs'}>Blogs</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/about'}>About</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={"/contact"}>Contact Us</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/help'}>Help</NavLink></li>
            </ul>
          </div>

          <div className='flex items-center md:static'>
          {/* Dark mode toggle button */}
            <div className='absolute top-2 right-14 md:static inline-block mt-1 mr-3 md:right-[12rem]'>
              <div className={`relative inline-block w-10 h-6 ${isActive ? 'bg-gray-300' : 'bg-black'} rounded-full cursor-pointer`} onClick={handleButtonClick}>
                {/* Thumb */}
                <div className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isActive ? 'translate-x-full' : 'translate-x-0'}`}> {isActive ? <BsFillMoonStarsFill size="0.9rem" className='mt-1 ml-1.5 text-black'/>:  <BsSunFill size="0.9rem" className='mt-1 ml-1.5' />}</div>
                {/* Input */}
                <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer" checked={isActive} onChange={() => {}} aria-label="Dark mode toggle" />
              </div>
              
            </div>
              <IoReorderThree onClick={()=>{setShowNav(!ShowNav)}} className='cursor-pointer text-5xl absolute top-[1px] right-3 md:hidden'/>

            {/* Sign-up or Logout button */}
            <div className={`link ml-[-20px] md:ml-4 flex justify-center items-center w-[100%] ${ShowNav?"hidden":""}`}>
              {
                authStatus ? (
                  <div className='relative'>
                    <button className={`p-1 flex ${ShowNav?"hidden":""}`} onClick={toggleDropdown}><FaUserCircle size="2em" /><MdOutlineArrowDropDown className='mt-[.20rem] text-2xl'/></button>
                    {isDropdownOpen && (
                      <div className='absolute top-full w-[10vw] right-[-8vh] mt-1 bg-white border border-gray-200 rounded shadow-md text-center'>
                        {/* Your dropdown content */}
                        <NavLink to={`/user/${userData.userData.name}`}><div className='p-3 hover:bg-gray-100'>Account</div></NavLink>
                        <NavLink to={`/my-blogs`}><div className='p-3 hover:bg-gray-100'>My Blogs</div></NavLink>
                        <NavLink to={'/setting'}><div className='p-3 hover:bg-gray-100'>Setting</div></NavLink>
                        <div className='p-3'><NavLink to='/'><LogoutBtn /></NavLink></div>
                      </div>
                    )}
                  </div>
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
