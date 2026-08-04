import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineSettings, MdVerified } from 'react-icons/md';
import Button from '../layout/Button';
import { Link } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Deactivate from '../layout/Deactivate';

const Settings = () => {
  const [fontSize, setFontSize] = useState('medium');
  const [selectedNavItem, setSelectedNavItem] = useState('Account');
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const themeSwitch = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  const handleThemeChange = () => {
    themeSwitch();
  };

  const handleFontSizeChange = (selectedFontSize) => {
    setFontSize(selectedFontSize);
  };

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
  };

  const VerifyEmail = async () => {
    if (userData?.isVerified) {
      toast.success('Email already verified');
      return;
    }
    try {
      await authService.createVerification();
    } catch {
      /* toast handled in service */
    }
  };

  const DeactivateHandler = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[100vh]">
      <div className="w-full md:w-64 bg-gray-800 dark:bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">
          <MdOutlineSettings className="inline mb-2 text-3xl mr-2" />
          Settings
        </h2>
        <ul>
          {['Account', 'general', 'theme', 'font'].map((item) => (
            <li
              key={item}
              className={`cursor-pointer py-2 px-4 mb-2 rounded capitalize ${
                selectedNavItem === item ? 'bg-orange-500' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleNavItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6 md:p-10">
        {selectedNavItem === 'Account' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Account</h2>
            <div className="space-y-4 max-w-lg">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{userData?.name || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium flex items-center gap-2">
                  {userData?.email || '—'}
                  {userData?.isVerified && (
                    <MdVerified className="text-blue-500" title="Verified" />
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {!userData?.isVerified && (
                  <Button onClick={VerifyEmail}>Send verification email</Button>
                )}
                <Link to="/password-reset">
                  <Button className="bg-gray-700">Change password</Button>
                </Link>
                <Button onClick={DeactivateHandler} className="bg-red-600">
                  Deactivate account
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedNavItem === 'general' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">General</h2>
            <p className="text-gray-500">General preferences coming soon.</p>
          </div>
        )}

        {selectedNavItem === 'theme' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Theme</h2>
            <Button onClick={handleThemeChange}>Toggle light / dark</Button>
          </div>
        )}

        {selectedNavItem === 'font' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Font size</h2>
            <select
              value={fontSize}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="border rounded px-3 py-2 dark:bg-gray-900"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        )}
      </div>

      {open && (
        <Deactivate
          open={open}
          setOpen={setOpen}
          userId={userData?._id}
        />
      )}
    </div>
  );
};

export default Settings;