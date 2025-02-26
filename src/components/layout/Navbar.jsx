import React, { useEffect } from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import { useState } from 'react';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { IoReorderThree } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { use } from 'react';

export default function Navbar() {
  const userData = useSelector((state) => state.auth.userData?.userData);
  console.log(userData);


  let loading = false;
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userData?.name) {
      setUsername(userData.name);
    }
  }, [userData]);

  // authStatus
  const authStatus = useSelector((state) => state.auth.status);

  // TO show or hide the navbar in mobile view
  const [ShowNav, setShowNav] = useState(false);

  // TO handle profile or darkmode in mobile view
  const [screenSize, setScreenSize] = useState(false);


  // Toggle Dark Mode
  const [isActive, setIsActive] = useState(true);

  const handleButtonClick = () => {
    setIsActive(!isActive);
    themeSwitch();
  };





  // Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    // Retrieve the stored state from local storage
    const storedDropdownState = localStorage.getItem('dropdownState');
    setIsDropdownOpen(storedDropdownState === 'true');
  }, []);

  useEffect(() => {
    // Store the current dropdown state in local storage
    localStorage.setItem('dropdownState', isDropdownOpen.toString());
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setShowNav(true);
  };

  useEffect(() => {
    const handleResize = () => {
      // Set ShowNav to true if the screen size is small
      setShowNav(window.innerWidth <= 770); // Adjust the threshold as needed
      setScreenSize(window.innerWidth <= 770)
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // **Dark-light mode
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // **Initial Theme Check
  useEffect(() => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
    }
  }, [userTheme, systemTheme]);

  // **Manual Theme Switcher
  const themeSwitch = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      return;
    }
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  };

  return (
    <div className='dark:bg-black dark:text-white'>
      {loading ? (
        <LoadingComponent
          isContentLoaded={false}
          progress={progress}
          setProgress={setProgress}
        />
      ) :
        <nav className={`relative p-3 w-[100vw] z-10 border-b border-gray-500`}>
          <div className=' flex flex-col justify-between md:flex-row md:justify-between md:max-w-6xl md:mx-auto'>
            <div className='img flex items-center'>
              <NavLink to={"/"}>
                <img className='h-7 max-w-max' src={userTheme === "dark" ? "../Logo.png" : "../Logo d.png"} alt="companylogo" loading="lazy" />
              </NavLink>
            </div>

            <div className={`link md:flex justify-center items-center w-[100%] ${ShowNav ? 'hidden' : 'flex'} `}>
              <ul className={`flex-col gap-4 md:relative md:top-0 md:bg-transparent md:p-0 md:flex-row flex md:gap-10 text-base font-medium mt-2 poppins text-gray-500 dark:text-white sm:absolute sm:bg-slate-50 sm:p-5 sm:top-10 sm:right-0`}>
                <li className='hover:text-orange-400 cursor-pointer'> <NavLink to='' onClick={closeDropdown}>Home</NavLink></li>
                <li className='hover:text-orange-400 cursor-pointer'><NavLink to={'/blogs'} onClick={closeDropdown}>Blogs</NavLink></li>
                <li className='hover:text-orange-400 cursor-pointer'><NavLink to={'/about'} onClick={closeDropdown}>About</NavLink></li>
                <li className='hover:text-orange-400 cursor-pointer'><NavLink to={"/contact"} onClick={closeDropdown}>Contact Us</NavLink></li>
                <li className='hover:text-orange-400 cursor-pointer'><NavLink to={'/help'} onClick={closeDropdown}>Help</NavLink></li>
              </ul>
            </div>

            <div className='flex items-center md:static'>
              <div className='absolute top-2 right-14 md:static inline-block mt-1 mr-3 md:right-[12rem]'>
                {
                  screenSize ? (
                    authStatus ? (
                      <div className='relative'>
                        <button className={`flex items-center md:flex`} onClick={toggleDropdown}><FaUserCircle size="2em" /><MdOutlineArrowDropDown className='mt-[.20rem] text-2xl' /></button>

                        {isDropdownOpen && ShowNav && (
                          <div className='absolute z-10 top-full md:w-[10vw] md:right-[-3vh] sm:right-0 sm:w-[20vw] mt-1 bg-white dark:bg-black dark:text-white border border-gray-200 rounded shadow-md text-center'>
                            {/* Your dropdown content */}
                            {/* {console.log(userData)} */}

                            <NavLink to={`/user/${userData.name}`} onClick={closeDropdown}><div className='p-3 hover:bg-gray-100 dark:hover:bg-gray-900'>Account</div></NavLink>
                            <NavLink to={`/my-blogs`}><div className='p-3 hover:bg-gray-100 dark:hover:bg-gray-900' onClick={closeDropdown}>My Blogs</div></NavLink>
                            <NavLink to={'/setting'}><div className='p-3 hover:bg-gray-100 dark:hover:bg-gray-900' onClick={closeDropdown}>Setting</div></NavLink>
                            <div className='p-3'><NavLink to='/'><LogoutBtn /></NavLink></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`relative inline-block w-10 h-6 ${isActive ? 'bg-gray-500' : 'bg-gray-500'} rounded-full cursor-pointer`} onClick={handleButtonClick}>
                        {/* Thumb */}
                        <div className={`absolute top-0 left-[-3px] w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform ${isActive ? 'translate-x-full' : 'translate-x-0'}`}>
                          {isActive ? <BsFillMoonStarsFill size="0.9rem" className='mt-1 ml-1.5 text-black' /> : <BsSunFill size="0.9rem" className='mt-1 ml-1.5 text-black' />}
                        </div>
                        {/* Input */}
                        <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer" checked={isActive} onChange={() => { }} aria-label="Dark mode toggle" />
                      </div>
                    )
                  ) : (
                    <div className={`relative inline-block w-10 h-6 ${isActive ? 'bg-gray-500' : 'bg-gray-500'} rounded-full cursor-pointer`} onClick={handleButtonClick}>
                      {/* Thumb */}
                      <div className={`absolute top-0 left-[-3px] w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform ${isActive ? 'translate-x-full' : 'translate-x-0'}`}>
                        {isActive ? <BsFillMoonStarsFill size="0.9rem" className='mt-1 ml-1.5 text-black' /> : <BsSunFill size="0.9rem" className='mt-1 ml-1.5 text-black' />}
                      </div>
                      {/* Input */}
                      <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer" checked={isActive} onChange={() => { }} aria-label="Dark mode toggle" />
                    </div>
                  )
                }

              </div>

              <div>
                <IoReorderThree onClick={() => { setShowNav(!ShowNav) }} className='cursor-pointer text-5xl absolute top-[1px] right-3 md:hidden' />
              </div>

              {/* Sign-up or Logout button */}
              <div className={`link ml-[-20px] md:ml-4 md:relative flex justify-center items-center sm:absolute sm:right-[-2rem]`}>
                {
                  authStatus ? (
                    <div className='relative'>
                      {screenSize ? " " : <button className={`p-1 md:flex `} onClick={toggleDropdown}><FaUserCircle size="2em" /><MdOutlineArrowDropDown className='mt-[.20rem] text-2xl' /></button>}

                      {isDropdownOpen && !screenSize && (
                        <div className='absolute z-10 top-full md:w-[10vw] md:right-[-3vh] sm:right-0 sm:w-[20vw] mt-1 bg-white dark:bg-black dark:text-white border border-gray-200 rounded shadow-md text-center'>
                          {/* Your dropdown content */}
                          <NavLink to={`/user/${username}`} onClick={closeDropdown}><div className='p-3 hover:bg-gray-100 dark:hover:bg-gray-900'>Account</div></NavLink>
                          <NavLink to={`/my-blogs`}><div className='p-3 hover:bg-gray-100 dark:hover:bg-gray-900' onClick={closeDropdown}>My Blogs</div></NavLink>
                          <NavLink to={'/setting'}><div className='p-3 hover:bg-gray-100 dark:hover:bg-gray-900' onClick={closeDropdown}>Setting</div></NavLink>
                          <div className='p-3'><NavLink to='/'><LogoutBtn /></NavLink></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex justify-center w-[100vw] mt-1 md:mt-0 md:w-auto md:block'>
                      <NavLink to='signup' onClick={closeDropdown} className={`flex justify-center  ${ShowNav ? "hidden md:block" : ""}`}><Button type="submit" className="w-full">
                        Signup
                      </Button></NavLink>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </nav>
      }
    </div >
  )
}
