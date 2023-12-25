import React from 'react'
import Button from '../layout/Button'
import { useSelector } from 'react-redux';
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter, FaLink } from "react-icons/fa6";
import { BsGithub } from 'react-icons/bs';
import { CiEdit } from "react-icons/ci";
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MyBlogs from './MyBlogs';

export default function Profile() {
    const userData = useSelector((state) => state.auth.userData.userData);

    let email = userData.email;
    let name = userData.name;
    let phone = userData.phone;
    let password = userData.password;
    let status = userData.status;


    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleEditClick = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick((prevClick) => !prevClick);            // it is used for toggling
    };

    // User Links
    const [Links, setLinks] = useState([
        { type: 'github', url: '' },
        { type: 'twitter', url: '' },
        { type: 'facebook', url: '' },
        { type: 'linkedin', url: '' },
        { type: 'random', url: '' },
    ]);

    const handleSaveClick = () => {
        const lowercaseInputText = inputText.toLowerCase();

        setLinks((prevLinks) => {
            const updatedLinks = prevLinks.map((link) => ({ ...link }));

            switch (true) {
                case lowercaseInputText.includes('github'):
                    updatedLinks[0].url = inputText;
                    break;
                case lowercaseInputText.includes('twitter'):
                    updatedLinks[1].url = inputText;
                    break;
                case lowercaseInputText.includes('facebook'):
                    updatedLinks[2].url = inputText;
                    break;
                case lowercaseInputText.includes('linkedin'):
                    updatedLinks[3].url = inputText;
                    break;
                default:
                    updatedLinks[4].url = inputText;
            }

            return updatedLinks;
        });

        setInputText('');
        setIsEditing(false);
    };


    return (
        <div>
            <div className='w-[70vw] mx-auto m-10 '>
                <div>
                    <h1 className='text-4xl py-5 font-semibold'>Account Setting</h1>
                </div>

                <div className='flex bg-slate-100 p-5 h-[50vh]'>
                    <div className='flex w-full'>

                        <div className='profile-img '>
                            <div className='img h-[25vh] w-[13vw] mt-12 rounded-full border-2 m-5 ml-10 bg-white overflow-hidden '>
                                <FaUserSecret className='mx-auto mt-4' size="9em" />
                            </div>
                        </div>

                        <div className='flex flex-col user-content  w-full'>
                            <div className='content flex justify-around  h-full'>

                                <div className='details flex flex-col my-auto gap-3'>
                                    <div>
                                        <h1 className='text-5xl text-center font-semibold'>{name ? name : 'USER'}</h1>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <h1 className='text-2xl text-center text-gray-500 font-semibold'>Status</h1><span className={`block w-4 h-4 rounded-full ml-3 mt-1  ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    </div>
                                    <div className='position'>
                                        <h3 className='text-sm text-center text-gray-500 font-semibold'>Founder of Loveense</h3>
                                    </div>
                                    <div className='location'>
                                        <h3 className='text-sm text-center text-gray-500 font-semibold'>Mirjapur, Bihar (U.P.)</h3>
                                    </div>
                                </div>

                                <div className='links my-auto'>
                                    <div className="mt-5">

                                        {isEditing && (
                                            <div className="absolute w-[30vw] shadow-lg bg-white top-[40vh] left-1/2 transform -translate-x-1/2 p-5 flex flex-col">
                                                <div className='flex'>
                                                    <span className='bg-slate-100 p-3 mb-3 rounded-l-md'>
                                                        <FaLink size="1.3em" className="text-xl" />
                                                    </span>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter your link'
                                                        value={inputText}
                                                        onChange={(e) => setInputText(e.target.value)}
                                                        className='border p-2 mb-3 w-full focus:outline-none'
                                                    />
                                                </div>

                                                <div className='flex justify-end'>
                                                    <button className='mr-3 px-4 py-2 bg-orange-500 text-white rounded-md' onClick={handleSaveClick}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex space-x-2">
                                            {Links.map((link) => (
                                                link.url && (
                                                    <NavLink key={link.type} to={link.url} target="_blank" rel="noopener noreferrer">
                                                        <li className="block">
                                                            {link.type === 'github' && <BsGithub size="1.5em" className="text-xl mr-3 hover:text-orange-500" />}
                                                            {link.type === 'twitter' && <FaXTwitter size="1.5em" className="text-xl mr-3 hover:text-orange-500" />}
                                                            {link.type === 'facebook' && <FaFacebookF size="1.5em" className="text-xl mr-3 hover:text-orange-500" />}
                                                            {link.type === 'linkedin' && <FaLinkedin size="1.5em" className="text-xl mr-3 hover:text-orange-500" />}
                                                            {link.type === 'random' && <FaLink size="1.5em" className="text-xl mr-3 hover:text-orange-500" />}
                                                        </li>
                                                    </NavLink>
                                                )
                                            ))}
                                        </div>

                                        <div className='flex justify-center mt-5'>
                                            <Button onClick={handleEditClick}>Add Links</Button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='buttons flex p-4 justify-center '>
                                <div className='flex text-lg font-semibold gap-5 bg-white px-5 '>
                                    <h1 className='p-3 border-r-2'>48 Followers</h1>
                                    <h1 className='p-3'>166 Following</h1>
                                </div>

                                {name == name ? <Button className='rounded-none' onClick={handleClick}>Edit Details</Button> : <Button className='rounded-none px-11'>Follow +</Button>}

                                {click && (
                                    <div className='absolute top-2/3 shadow-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5'>
                                        <div className='fields p-4 flex flex-col gap-y-5'>
                                            <div className='mb-4 flex items-center'>
                                                <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='email'>Email</label>
                                                <input type='email' id='email' className='border-b-2 bg-white p-2 focus:outline-none focus:border-orange-400 ml-auto' placeholder={email ? email : 'Enter your email'} />
                                            </div>

                                            <div className='mb-4 flex items-center gap-10'>
                                                <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='name'>Name</label>
                                                <input type='text' id='name' className='border-b-2 bg-white p-2 focus:outline-none focus:border-orange-400 ml-auto' placeholder={name ? name : 'Enter your name'} />
                                            </div>

                                            <div className='mb-4 flex items-center gap-10'>
                                                <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='username'>Username</label>
                                                <input type='text' id='username' className='border-b-2 bg-white p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={name ? name : 'Enter your username'} />
                                            </div>

                                            <div className='mb-4 flex items-center gap-10'>
                                                <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='contact'>Contact</label>
                                                <input type='tel' id='contact' className='border-b-2 bg-white p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={phone ? phone : 'Enter your contact no.'} />
                                            </div>

                                            <div className='mb-4 flex items-center gap-10'>
                                                <label className='inline-block text-gray-600 text-lg font-semibold' htmlFor='password'>Password</label>
                                                <input type='password' id='password' className='border-b-2 bg-white p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={password ? password : 'Enter passcode'} />
                                            </div>

                                            <div className='mx-auto'>
                                                <Button>Save Changes</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-slate-50 p-5'>
                    <MyBlogs />
                </div>
            </div>

        </div>
    )
}

