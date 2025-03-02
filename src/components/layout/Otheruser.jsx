import React, { useEffect, useState } from 'react'
import appwriteService from "../../appwrite/config";
import Button from '../layout/Button'
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter, FaLink } from "react-icons/fa6";
import { BsGithub } from 'react-icons/bs';
import authService from '../../appwrite/auth';


export default function Otheruser(props) {
    const userid = props.userid

    const [user, setuser] = useState(null);
    const [name, setName] = useState('')
    const [profilepicture, setprofilepicture] = useState(null);
    const [location, setLocation] = useState(null);
    const [regionImg, setRegionImg] = useState(null);


    // Get other user details
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await appwriteService.getUser(userid);
                setuser(data);
                setName(data.name);
                console.log("Fetched User Data:", data); // ✅ Debugging log

                if (data.profileImageId) {
                    const profilePreview = await appwriteService.getProfilePreview(data.profileImageId);
                    setprofilepicture(profilePreview);
                    console.log("Profile Image Set:", profilePreview); // ✅ Debugging log
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchLocationAndImage = async () => {
            try {
                const location = await authService.getLocale();
                if (location) {
                    setLocation(location);
                    console.log("Location Set:", location); // ✅ Debugging log

                    const img = await authService.getAvtar(location.countryCode);
                    if (img) {
                        setRegionImg(img.href); // Uncomment if you want to use country-based profilepictures
                    }
                }
            } catch (error) {
                console.error("Error fetching location or profilepicture:", error);
            }
        };

        fetchUserData();
        fetchLocationAndImage();
    }, [userid]); // ✅ Proper dependency


    return (
        <div>
            <div className='flex bg-slate-100 dark:bg-gray-900  h-[65vh] shadow-md shadow-orange-100 overflow-hidden rounded-xl'>
                <div className='flex w-[60vw]'>

                    <div className='relative w-[30vw]'>
                        <div className='absolute z-0 rounded-xl w-[33vw] h-[45vh] bg-orange-500 rotate-[55deg] top-[10vh] right-[5vh]'>F</div>
                        <div className='img relative z-10 h-[30vh] w-[15vw] mt-12 rounded-full border-2 m-5 ml-10 bg-white overflow-hidden'>
                            {profilepicture ? <img src={profilepicture} alt="profile" className='w-full h-full object-cover' loading="lazy" /> : <FaUserSecret size="5em" className='text-black' />}
                        </div>
                        <div className='img relative z-10 text-white font-bold'>
                            <h1 className='text-2xl text-center font-semibold'>{name ? name : 'USER'}</h1>
                            <div className='flex items-center justify-center mt-1'>
                                <h1 className='text-base text-center text-gray-100 font-semibold'>Status</h1><span className={`block w-3 h-3 rounded-full ml-2 mt-1  ${status ? 'bg-green-500' : 'bg-red-600'}`}></span>
                            </div>
                            <div className='location flex justify-center gap-2 mt-2'>
                                <h3 className='text-sm text-center text-gray-100 font-semibold inline'>{location ? location.country : "Mirzapur"}
                                </h3>
                                <img className='rounded-full inline h-[20px]' src={`${regionImg}`} alt="location" loading="lazy" />
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
                            <div className='flex text-lg font-semibold gap-5 text-black bg-white px-5 '>
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
