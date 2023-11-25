import React from 'react'
import Button from '../layout/Button'
import { useSelector } from 'react-redux';
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter } from "react-icons/fa6";
import { BsGithub } from 'react-icons/bs';

export default function Profile() {
    const userData = useSelector((state) => state.auth.userData.userData);

    let email = userData.email;
    let name = userData.name;
    let phone = userData.phone;
    let password = userData.password;
    let status = userData.status;
    
  return (
    <div>
       <div className='w-[60vw] mx-auto m-10'>
            <div>
                <h1 className='text-5xl py-5 font-semibold'>Account Setting</h1>
            </div>

            <div className='flex justify-evenly my-5 bg-slate-50 p-5'>
                <div className='img'>
                    <div className='img h-[15vh] w-[10vw] mt-12 rounded-full border-2 m-5 bg-white'>
                        <FaUserSecret className='mx-auto mt-4' size="5em" />
                    </div>
                    <div>
                        <h1 className='text-2xl text-center font-semibold'>{name ? name : 'USER'}</h1>
                    </div>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-2xl text-center text-gray-500 font-semibold'>Status</h1><span className={`block w-4 h-4 rounded-full ml-3 mt-1  ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </div>
                    <div className="cursor-pointer mt-5">
                            <div className="flex space-x-2">
                                <li className="block">
                                    <BsGithub size="1.3em" className="text-xl mr-3 hover:text-orange-500"/>
                                </li>
                                <li className="block">
                                    <FaXTwitter size="1.3em" className="text-xl mr-3 hover:text-orange-500"/>
                                </li>
                                <li className="block">
                                    <FaFacebookF size="1.3em" className="text-xl mr-3 hover:text-orange-500"/>
                                </li>
                                <li className="block">
                                    <FaLinkedin size="1.3em" className="text-xl mr-3 hover:text-orange-500"/>
                                </li>
                            </div>
                    </div>
                </div>

                <div className='fields p-4 flex flex-col gap-y-5'>
                    <div className='mb-4 flex items-center'>
                        <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='email'>Email</label>
                        <input type='email' id='email' className='border-b-2 bg-slate-50 p-2 focus:outline-none focus:border-orange-400 ml-auto' placeholder={email ? email : 'Enter your email'}/>
                    </div>

                    <div className='mb-4 flex items-center gap-10'>
                        <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='name'>Name</label>
                        <input type='text' id='name'  className='border-b-2 bg-slate-50 p-2 focus:outline-none focus:border-orange-400 ml-auto' placeholder={name ? name : 'Enter your name'}/>
                    </div>
                    
                    <div className='mb-4 flex items-center gap-10'>
                        <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='username'>Username</label>
                        <input type='text' id='username'  className='border-b-2 bg-slate-50 p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={name ? name : 'Enter your username'}/>
                    </div>

                    <div className='mb-4 flex items-center gap-10'>
                        <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='contact'>Contact</label>
                        <input type='tel' id='contact'  className='border-b-2 bg-slate-50 p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={phone ? phone : 'Enter your contact no.'}/>
                    </div>

                    <div className='mb-4 flex items-center gap-10'>
                        <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='password'>Password</label>
                        <input type='password' id='password'  className='border-b-2 bg-slate-50 p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={password ? password : 'Enter passcode'}/>
                    </div>

                    <div className='mx-auto'>
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

/*
     <div className='flex justify-center my-10'>
        <div className='flex'>
                <div className='bg-gray-300 p-4 shadow-md transition-transform w-[15vw]' >
                    <div className='img h-[15vh] mt-12 rounded-full border-2 m-5 bg-white'>
                        <FaUserSecret className='mx-auto mt-3' size="5em" />
                    </div>
                    <div className='text text-center m-5'>
                        <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
                        <div className="text-sm cursor-pointer mt-5">
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



*/