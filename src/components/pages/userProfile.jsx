import React from 'react'
import Button from '../layout/Button'

export default function Profile() {

  return (
    <div>
        <div className='flex justify-center my-10'>
        <div className='flex'>
                <div className='bg-gray-300 p-4 shadow-md transition-transform w-[15vw]' >
                    <div className='img h-[15vh] mt-12 rounded-full border-2 m-5 bg-white'>
                        <img className='w-full h-full object-cover' src="./logo512.png" alt="logo"/>
                    </div>
                    <div className='text text-center mt-10 m-5'>
                        <h1 className="text-2xl font-bold mb-2">REACT</h1>
                        <h1 className="text-sm cursor-pointer">User Socials</h1>
                    </div>
                </div>
                <div className='bg-gray-300 p-4 shadow-md transition-transform'>
                    <div className='text text-right mt-10 m-10 flex flex-col'>
                        <input
                            type="text"
                            className="border-2 bg-slate-200 border-gray-300 p-3 rounded-md focus:outline-none mb-4 "
                            placeholder="Username"
                        />

                        <input
                            type="text"
                            className="border-2 bg-slate-200 border-gray-300 p-3 rounded-md focus:outline-none  mb-4 "
                            placeholder="Full Name"
                        />

                        <input
                            type="password"
                            className="border-2 bg-slate-200 border-gray-300 p-3 rounded-md focus:outline-none mb-4 "
                            placeholder="Password"
                            disabled
                        />

                        <Button>Save Changes</Button>
                    
                    </div>
                </div>
                <div className='bg-gray-300 w-[15vw] p-4 shadow-md transition-transform'>
                        <div className='text text-right mt-10 px-3'>
                            <div className="text-xl font-bold mb-2 p-3 hover:bg-gray-100">Edit</div>
                            <div className="text-lg font-semibold mb-2 text-gray-600 p-3 hover:bg-gray-100">My Blogs</div>
                            <div className="text-lg font-semibold mb-2 text-gray-600 p-3 hover:bg-gray-100">Setting</div>
                            <div className="text-lg font-semibold mb-2 text-gray-600 p-3 hover:bg-gray-100">Logout</div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}
