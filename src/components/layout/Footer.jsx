import React from "react";
import { BsGithub } from 'react-icons/bs';
import { FaXTwitter, FaFacebookF, FaLinkedin } from 'react-icons/fa6';
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto flex flex-wrap justify-between">
          {/* Footer Top Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
            <li className="block my-4"><img className='h-10' src="../Logo.png" alt="logo" /></li>
            <p className="text-sm"> Explore, connect, and be inspired on our blog, where every post unfolds a new chapter in the journey of curiosity. </p>
          </div>

          {/* Footer Menu Links */}
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 md:w-1/4 px-10 mb-8">
              <h4 className="text-lg font-semibold mb-2">Menu</h4>
              <ul>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200"><NavLink to=''>Home</NavLink></li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200"><NavLink to={'/about'}>About</NavLink></li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200"><NavLink to={"/contact"}>Contact</NavLink></li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 px-10 mb-8">
              <h4 className="text-lg font-semibold mb-2">Blogs</h4>
              <ul>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200"><NavLink to={'/blogs'}>Food Blog</NavLink></li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200"><NavLink to={'/blogs'}>Tech Blog</NavLink></li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200"><NavLink to={'/blogs'}>Traveling Blog</NavLink></li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 px-10 mb-8">
              <h4 className="text-lg font-semibold mb-2">
                Services
              </h4>
              <ul>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200">
                  Privacy
                </li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200">
                  Services
                </li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200">
                  Copyright
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 px-10 mb-8">
              <h4 className="text-lg font-semibold mb-2">Get in Touch</h4>
              <ul>
                <li className="block mb-4 hover:text-indigo-400 cursor-pointer transition duration-200">
                  Email: google123@gmail.com
                </li>
                <li className="block mb-2 hover:text-indigo-400 cursor-pointer transition duration-200">
                  Phone No. 1234567890
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright and Social Media Icons */}
          <div className="w-full px-4 mt-4 text-sm flex justify-between items-center">
            <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
            <div className="flex space-x-2">
              <li className="block">
                <BsGithub className="text-xl mr-3"/>
              </li>
              <li className="block">
                <FaXTwitter className="text-xl mr-3"/>
              </li>
              <li className="block">
                <FaFacebookF className="text-xl mr-3"/>
              </li>
              <li className="block">
                <FaLinkedin className="text-xl mr-3"/>
              </li>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
