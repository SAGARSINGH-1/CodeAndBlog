import React, {useEffect,useState} from 'react'
import appwriteService from "../../appwrite/auth";
import Button from '../layout/Button'
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter, FaLink } from "react-icons/fa6";
import { BsGithub } from 'react-icons/bs';


export default function Otheruser(userid) {

    const [name, setName] = useState('')
    console.log(userid);

    // TODO: Get other user details
    // useEffect(() => {
    //     appwriteService.getOtherUserDetails(userid).then((user) => {
    //         if (user) {
    //             setName(user.name)
    //             console.log(user);
    //         }
    //     })
    // }, [])


    return (
        <div>
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
                                    <div className="flex flex-col gap-10 items-center space-x-2">
                                        <ul className="flex">
                                            <li><BsGithub size="1.5em" className="text-xl mr-3 hover:text-orange-500" /></li>
                                            <li><FaXTwitter size="1.5em" className="text-xl mr-3 hover:text-orange-500" /></li>
                                            <li><FaFacebookF size="1.5em" className="text-xl mr-3 hover:text-orange-500" /></li>
                                            <li><FaLinkedin size="1.5em" className="text-xl mr-3 hover:text-orange-500" /></li>
                                            <li><FaLink size="1.5em" className="text-xl mr-3 hover:text-orange-500" /></li>
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
