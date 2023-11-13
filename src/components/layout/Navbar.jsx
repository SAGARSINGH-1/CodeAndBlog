import React from 'react'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

export default function Navbar() {
  const authStatus = useSelector((state) => state.auth.status)

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
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/blogs'}>Blogs</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/about'}>About</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={"/contact"}>Contact Us</NavLink></li>
              <li className='hover:text-pink-400 cursor-pointer'><NavLink to={'/help'}>Help</NavLink></li>
            </ul>
          </div>

          {
            authStatus ? (
              <NavLink to='/'><LogoutBtn /></NavLink>
            ) : (<NavLink to='signup'><Button type="submit" className="w-full">
              Signup
            </Button></NavLink>)
          }

        </div>
      </nav>
    </div>
  )
}
