import React, { useState } from 'react';
import { MdOutlineSettings } from "react-icons/md";

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [selectedNavItem, setSelectedNavItem] = useState('general');

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

  return (
    <div className="flex h-[500px] bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6"><MdOutlineSettings className='inline mb-2 text-3xl mr-2'/>Settings</h2>
        <ul>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${
              selectedNavItem === 'general' ? 'bg-orange-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleNavItemClick('general')}
          >
            General
          </li>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${
              selectedNavItem === 'theme' ? 'bg-orange-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleNavItemClick('theme')}
          >
            Theme
          </li>
          <li
            className={`cursor-pointer py-2 px-4 mb-2 rounded ${
              selectedNavItem === 'font' ? 'bg-orange-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleNavItemClick('font')}
          >
            Font
          </li>
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-8">
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
