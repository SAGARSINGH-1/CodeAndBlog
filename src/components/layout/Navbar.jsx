import React from 'react'
import Button from './Button'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
    <nav className='p-3 w-[100vw]'>
        <div className='flex justify-between max-w-6xl mx-auto'>
          <div className='img mt-2'>
            LOGO
          </div>
          <div className='link'>
            <ul className='flex gap-10 text-base font-medium mt-2 poppins text-gray-500'>
              <li className='hover:text-pink-400 cursor-pointer'> <NavLink to=''>Home</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to='Blogs'>Blog</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'>About</li>
              <li className='hover:text-pink-400 cursor-pointer'>Contact Us</li>
              <li className='hover:text-pink-400 cursor-pointer'>Help</li>
            </ul>
          </div>
          
        
          <NavLink to='signup'><Button val="Sign up"/></NavLink>
          
        </div>
      </nav>
    </div>
  )
}
