import React from 'react'
import Button from './Button'
import {IoCreateOutline} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

function CreatePost() {
    return (
        <div className='fixed bottom-[30px] right-[30px]'>
            <NavLink to='/add-post'>
            <Button type="submit" className="rounded-2xl w-full">
                <IoCreateOutline className='mb-[.32rem] inline text-2xl'/>Create Post
            </Button>
            </NavLink>
        </div>
    )
}

export default CreatePost