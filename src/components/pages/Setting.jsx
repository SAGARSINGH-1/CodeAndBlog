import React, { useState } from 'react';
import { MdOutlineSettings } from "react-icons/md";
import Button from '../layout/Button';
import { Link } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdVerified } from "react-icons/md";
import Deactivate from '../layout/Deactivate';


const Settings = () => {
  const [theme, setTheme] = useState();
  const [fontSize, setFontSize] = useState('medium');
  const [selectedNavItem, setSelectedNavItem] = useState('Account');
  const userData = useSelector((state) => state.auth.userData);
  
  const notify = (message) => {
    toast.success(message);
  };

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

  const handleThemeChange = () => {
    themeSwitch();
    // **You can save the theme preference to user settings here
  };

  const handleFontSizeChange = (selectedFontSize) => {
    setFontSize(selectedFontSize);
    // **You can save the font size preference to user settings here
  };

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
  };

  // TODO: Email aready verifies not working
  // **Email verification link Send for verification of email
  const VerifyEmail = async () => {
    if (userData.userData.emailVerification) {
      notify("Email Already Verified");
      return;
    }
    await authService.createVerification();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get('secret');
  const userId = urlParams.get('userId');

  useEffect(() => {
    if (secret && userId) {
      // **Verification of email with secret and userId
      authService.updateVerification(secret, userId);
    }
  }, [secret, userId])

  // **Function to show or hide Deactivate Account Modal
  const [open, setOpen] = useState(false)
  const cancelButtonRef = React.useRef(null)
  const DeactivateHandler = () => {
    setOpen(true)
  }

  return (
    <div className="flex flex-col md:flex-row md:h-[100vh]">
      {
      //** Sidebar Area
      }
      <div className="w-full md:w-64 bg-gray-800 dark:bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">
          <MdOutlineSettings className="inline mb-2 text-3xl mr-2" />
          Settings
        </h2>
        <ul>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedNavItem === 'Account' ? 'bg-orange-500' : 'hover:bg-gray-700'
              }`}
            onClick={() => handleNavItemClick('Account')}
          >
            Account
          </li>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedNavItem === 'general' ? 'bg-orange-500' : 'hover:bg-gray-700'
              }`}
            onClick={() => handleNavItemClick('general')}
          >
            General
          </li>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedNavItem === 'theme' ? 'bg-orange-500' : 'hover:bg-gray-700'
              }`}
            onClick={() => handleNavItemClick('theme')}
          >
            Theme
          </li>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedNavItem === 'font' ? 'bg-orange-500' : 'hover:bg-gray-700'
              }`}
            onClick={() => handleNavItemClick('font')}
          >
            Font
          </li>
        </ul>
      </div>

      {
      //** Right Content Area
      }
      <div className="bg-gray-200 dark:bg-black flex-1 p-4 md:p-8 overflow-scroll no-scrollbar">
        {selectedNavItem === 'Account' && (
          <div className="">
            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Username</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600 dark:text-gray-400">Changing username from "username"</p>
              <p className="mb-5 text-black dark:text-white font-semibold">{userData.userData.name}</p>

              <Button>Change Username</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600 dark:text-gray-400">Change Email link to your Account</p>
              <p className="mb-5 text-black dark:text-white font-semibold">{userData.userData.email}{userData.userData.emailVerification ? <MdVerified className='inline ml-1' /> : ""}</p>
              <Button>Change Email</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Verify Email</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600 dark:text-gray-400">Verify Email link to your Account to Explore more features</p>
              <p className="mb-5 text-black dark:text-white font-semibold">{userData.userData.email}{userData.userData.emailVerification ? <MdVerified className='inline ml-1' /> : ""}</p>
              <Button className={`${userData.userData.emailVerification ? "cursor-not-allowed" : ""}`} disabled={userData.userData.emailVerification} onClick={VerifyEmail}>{userData.userData.emailVerification ? "Verified" : "Verify"}</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600 dark:text-gray-400">Change Password of your Account</p>
              <Link to={'/password-reset'}><Button>Change Password</Button></Link>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Phone Number</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600 dark:text-gray-400">Change Phone Number Link to your Account</p>
              <p className="mb-5 text-black dark:text-white font-semibold">{userData.userData.phone}</p>
              <Button>Change Phone No.</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Delete Your Account</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600 dark:text-gray-400">Delete Your Account and Data</p>
              <p className="mb-5 text-black dark:text-white font-semibold">{userData.userData.name}</p>
              <Button  onClick={DeactivateHandler} className='bg-red-600 hover:bg-red-500'>Delete Account</Button>
            </div>
          </div>
        )}

        {selectedNavItem === 'general' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">General Settings</h2>
            {
            // ** General settings content
            }
          </div>
        )}

        {selectedNavItem === 'theme' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Theme Settings</h2>
            {
            // **Theme settings content 
          }
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Theme</h3>
              <select
                value={localStorage.getItem("theme")}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-white dark:bg-black"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        )}

        {selectedNavItem === 'font' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Font Settings</h2>
            { 
            //**Font settings content
            }
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Font Size</h3>
              <select
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-white dark:bg-black"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {
      // ** Deactivate Account Modal
      <Deactivate show={open} setOpen={setOpen} userId={userData.userData.$id} cancelButtonRef={cancelButtonRef} />
      }
    </div>
  );
};

export default Settings;
