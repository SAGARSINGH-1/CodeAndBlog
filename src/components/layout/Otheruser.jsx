import React, { useEffect, useState } from 'react'
import appwriteService from "../../appwrite/config";
import Button from '../layout/Button'
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter, FaLink } from "react-icons/fa6";
import { BsGithub } from 'react-icons/bs';
import authService from '../../appwrite/auth';


export default function Otheruser(props) {
    const userid = props.userid

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState(null);
    const [location, setLocation] = useState(null);

    // console.log(data);

    // Get other user details
    useEffect(() => {
        const data = appwriteService.getUser(userid).then((data) => {
            setName(data.name)
        })

        const LocationData = authService.getLocale().then((location) => {
            if (location) {
                setLocation(location)
                const ImageData = authService.getAvtar(location.countryCode).then((img) => {
                    setAvatar(img.href);
                });
            }
        });
    }, [userid])
    return (
        <div>
            <div className='flex bg-slate-100  h-[65vh] shadow-xl overflow-hidden'>
                <div className='flex w-[60vw]'>

                    <div className='relative w-[30vw]'>
                        <div className='absolute z-0 rounded-xl w-[33vw] h-[45vh] bg-orange-500 rotate-[55deg] top-[10vh] right-[5vh]'>F</div>
                        <div className='img relative z-10 h-[30vh] w-[15vw] mt-12 rounded-full border-2 m-5 ml-10 bg-white overflow-hidden'>
                            {avatar ? <img src={avatar} alt="profile" className='w-full h-full object-cover' loading="lazy"/> : <FaUserSecret size="5em" className='text-black' />}
                        </div>
                        <div className='img relative z-10 text-white font-bold'>
                            <h1 className='text-2xl text-center font-semibold'>{name ? name : 'USER'}</h1>
                            <div className='flex items-center justify-center mt-1'>
                                <h1 className='text-base text-center text-gray-100 font-semibold'>Status</h1><span className={`block w-3 h-3 rounded-full ml-2 mt-1  ${status ? 'bg-green-500' : 'bg-red-600'}`}></span>
                            </div>
                            <div className='location flex justify-center gap-2 mt-2'>
                                <h3 className='text-sm text-center text-gray-100 font-semibold inline'>{location ? location.country : "Mirzapur"}
                                </h3>
                                <img className='rounded-full inline h-[20px]' src={`${avatar}`} alt="user" loading="lazy"/>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col user-content w-full justify-evenly'>
                        <div className='content flex flex-col h-full justify-evenly'>
                            <div className='details flex flex-col p-5'>
                                <div className='my-3'>
                                    <h2 className='font-bold text-xl my-2'>About</h2>
                                    <h2 className='text-base text-gray-500 font-semibold'>Founder at Loveense</h2>
                                    <h2 className="text-base text-gray-500 font-semibold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus, error!</h2>
                                </div>

                                <div className='bio'>
                                    <h2 className='font-bold text-xl my-2'>Bio</h2>
                                    <h3 className='text-base text-gray-500 font-semibold'>Founder of Loveense Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, autem!</h3>
                                </div>
                            </div>

                            <div className='links '>
                                <div className="flex justify-center">
                                    <div className="flex gap-10 items-center space-x-2">
                                        <ul className="flex gap-3">
                                            <li><BsGithub size="1.2em" className="text-xl hover:text-orange-500" /></li>
                                            <li><FaXTwitter size="1.2em" className="text-xl hover:text-orange-500" /></li>
                                            <li><FaFacebookF size="1.2em" className="text-xl hover:text-orange-500" /></li>
                                            <li><FaLinkedin size="1.2em" className="text-xl hover:text-orange-500" /></li>
                                            <li><FaLink size="1.2em" className="text-xl hover:text-orange-500" /></li>
                                        </ul>
                                        <div>
                                            <Button>Vist Profile</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='buttons flex p-4 justify-center '>
                            <div className='flex text-lg font-semibold gap-5 bg-white px-5 '>
                                <h1 className='p-3 border-r-2'>48 Followers</h1>
                                <h1 className='p-3'>166 Following</h1>
                            </div>

                            <Button className='rounded-none px-11'>Follow +</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
