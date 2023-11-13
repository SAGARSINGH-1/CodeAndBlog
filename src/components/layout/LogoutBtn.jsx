import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const logoutHandler = () => {
    try {
      authService.logout().then(() => {
          dispatch(logout())
          Navigate('/signup')
      })
      
    } catch (error) {
      console.log("Logout error", error);
    }
  }
  return (
    <div> <button className="rounded-lg border border-transparent px-3 py-2 text-lg font-semibold bg-orange-500 text-white cursor-pointer transition duration-250 hover:border-white hover:bg-orange-400" onClick={logoutHandler}>Logout</button></div>
  )
}

export default LogoutBtn