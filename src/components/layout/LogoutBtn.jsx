import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../index'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout()
        .then(() => {
            dispatch(logout());
        })
    }
  return (
    <div> <button className="rounded-lg border border-transparent px-3 py-2 text-lg font-semibold bg-orange-500 text-white cursor-pointer transition duration-250 hover:border-white hover:bg-orange-400">Logout</button></div>
  )
}

export default LogoutBtn