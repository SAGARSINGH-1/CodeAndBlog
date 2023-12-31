import React, { useState } from 'react';
import { MdOutlineSettings } from "react-icons/md";
import Button from '../layout/Button';
import { Link } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { MdVerified } from "react-icons/md";


const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [selectedNavItem, setSelectedNavItem] = useState('Account');
  const userData = useSelector((state) => state.auth.userData);
  const notify = (message) => {
    toast.success(message, { position: 'bottom-right', autoClose: 2000 });
  };



  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // You can save the theme preference to user settings here
  };

  const handleFontSizeChange = (selectedFontSize) => {
    setFontSize(selectedFontSize);
    // You can save the font size preference to user settings here
  };

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
  };

  // TODO: Email aready verifies not working
  // Email verification link Send for verification of email
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
      // Verification of email with secret and userId
      authService.updateVerification(secret, userId);
    }
  }, [secret, userId])

  return (
    <div className="flex h-[100vh] my-5 bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6"><MdOutlineSettings className='inline mb-2 text-3xl mr-2' />Settings</h2>
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

      {/* Right Content Area */}
      <div className="flex-1 p-8 overflow-scroll no-scrollbar">
        {selectedNavItem === 'Account' && (
          <div className="bg-gray-200 p-5 rounded-md shadow-md">
            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Username</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600">Changing username from "username"</p>
              <p className="mb-5 text-black">{userData.userData.name}</p>

              <Button>Change Username</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600">Change Email link to your Account</p>
              <p className="mb-5 text-black">{userData.userData.email}{userData.userData.emailVerification ? <MdVerified className='inline ml-1' /> : ""}</p>
              <Button>Change Email</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Verify Email</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600">Verify Email link to your Account to Explore more features</p>
              <p className="mb-5 text-black">{userData.userData.email}{userData.userData.emailVerification?<MdVerified className='inline ml-1' />:""}</p>
              <Button className={`${userData.userData.emailVerification?"cursor-not-allowed":""}`} disabled={userData.userData.emailVerification} onClick={VerifyEmail}>{userData.userData.emailVerification ? "Verified" : "Verify"}</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600">Change Password of your Account</p>
              <Link to={'/password-reset'}><Button>Change Password</Button></Link>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Change Phone Number</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600">Change Phone Number Link to your Account</p>
              <p className="mb-5 text-gray-600">{userData.userData.phone}</p>
              <Button>Change Phone No.</Button>
            </div>

            <div className='mb-10'>
              <h2 className="text-2xl font-semibold mb-4">Delete Your Account</h2>
              <hr className="my-4 border-t border-gray-500" />
              <p className="mb-5 text-gray-600">Delete Your Account and Data</p>
              <p className="mb-5 text-gray-600">{userData.userData.name}</p>
              <Button className='bg-red-600 hover:bg-red-500'>Delete Account</Button>
            </div>
          </div>
        )}


        {selectedNavItem === 'general' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">General Settings</h2>
            {/* General settings content */}
          </div>
        )}

        {selectedNavItem === 'theme' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Theme Settings</h2>
            {/* Theme settings content */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Theme</h3>
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
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
            {/* Font settings content */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Font Size</h3>
              <select
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
