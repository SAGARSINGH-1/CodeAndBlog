import React from 'react'
import Button from './Button'
import {IoCreateOutline} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

function CreatePost() {
    const authStatus = useSelector((state) => state.auth.status);
    return (
        (authStatus ? (
            <div className='fixed bottom-[30px] right-[30px]'>
              <NavLink to='/add-post'>
                <Button className="rounded-2xl w-full">
                  <IoCreateOutline className='mb-[.32rem] inline text-2xl'/>Create Post
                </Button>
              </NavLink>
            </div>
          ) : null)
    )
}

export default CreatePost