import React, { useState, useEffect } from 'react'
import Button from '../layout/Button'
import { useSelector } from 'react-redux';
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter, FaLink } from "react-icons/fa6";
import { BsGithub } from 'react-icons/bs';
import { CiEdit } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import MyBlogs from './MyBlogs';
import authService from '../../appwrite/auth';
import LoadingComponent from '../layout/Loader';
import { set } from 'react-hook-form';
import { IoCreateOutline } from 'react-icons/io5'
import { RxCross2 } from "react-icons/rx";
import appwriteService from "../../appwrite/config";
import toast from 'react-hot-toast';
import { LuUpload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";



export default function Profile() {
    const userData = useSelector((state) => state.auth.userData?.userData);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0); // Example progress state
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [loc_image, setloc_image] = useState(null);
    const [location, setLocation] = useState(null);
    const [user, setUser] = useState(null);


    // Edit profile picture : 

    const [image, setImage] = useState("https://i.pinimg.com/736x/4a/8d/49/4a8d49ad421e02dfb6105e912d721689.jpg");
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {

        if (!event.target.files.length) {
            toast.error("Please select a file");
            return;
        }
        const file = event.target.files[0];

        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (!validImageTypes.includes(file.type)) {
                console.error("Invalid file format. Please select a valid image.");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setImage(file);  // ✅ Store the File object, not the URL
            setPreview(imageUrl);  // ✅ Store the preview URL for display
            setShowModal(true);
        }
    };



    const updateProfile = async () => {
        if (!image) {
            toast.error("Please select a file");
        } else {

            try {
                console.log(image);

                // Upload profile to Appwrite storage
                await appwriteService.uploadProfileImage(image).then(async (data) => {
                    if (data) {
                        const fileId = data.$id;
                        console.log("Uploaded File ID:", fileId);

                        // ✅ Update user document in Appwrite database with the correct file ID
                        await appwriteService.updateUserProfile(userData.$id, { profileImageId: fileId }).then((data) => {

                            if (data) {
                                setImage(fileId);
                                setPreview(appwriteService.getProfilePreview(fileId));
                                setShowModal(false);
                            }
                        });
                        await appwriteService.updateArticleProfileId(userData.$id, { profileImageId: fileId });
                    }

                });

            } catch (error) {
                console.error("Upload failed:", error);
            }
        }
    };


    const removeProfile = async () => {
        if (!user.profileImageId) {
            toast.error("No profile image found to delete.");
            return;
        } else {

            try {
                // ✅ Delete the image from storage
                await appwriteService.deleteProfile(user.profileImageId).then(async (data) => {
                    if (data) {
                        await appwriteService.updateUserProfile(userData.$id, { profileImageId: null }).then((data) => {
                            if (data) {
                                // ✅ Clear the local state
                                setPreview("https://i.pinimg.com/736x/4a/8d/49/4a8d49ad421e02dfb6105e912d721689.jpg");
                                setImage(null);


                                toast.success("Profile image removed successfully.");
                            }
                        })
                    }
                    // ✅ Update the database to remove the image reference

                })

            } catch (error) {
                console.error("Failed to remove profile image:", error);
            }
        }
    };



    useEffect(() => {
        if (userData) {
            setEmail(userData.email || "");
            setUsername(userData.name || "");
            setPhone(userData.phone || "");
            setPassword(userData.password || "");
            setStatus(userData.status || "");
            setLoading(false);

            // used to get user details and profile preview from the bucket and the collection
            appwriteService.getUser(userData.$id).then((data) => {
                setUser(data);

                // ✅ Set the profile preview image correctly
                if (data.profileImageId) {
                    setPreview(appwriteService.getProfilePreview(data.profileImageId));
                } else {
                    setPreview("https://i.pinimg.com/736x/4a/8d/49/4a8d49ad421e02dfb6105e912d721689.jpg");
                }
            });
        }
    }, [userData]);


    useEffect(() => {
        if (user && user.profileImageId) {
            setPreview(appwriteService.getProfilePreview(user.profileImageId));
        }
    }, [user]);



    // TODO: Fetch avatar from appwrite according to the user
    useEffect(() => {
        const LocationData = authService.getLocale().then((location) => {
            if (location) {
                setLocation(location)
                const ImageData = authService.getAvtar(location.countryCode).then((img) => {
                    setloc_image(img.href);
                });
            }
            setLoading(false);
        });

    }, []);



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
            {loading ? (
                <LoadingComponent
                    isContentLoaded={false}
                    progress={progress}
                    setProgress={setProgress}
                />
            ) :
                <div className='md:w-[70vw] w-[100vw] md:mx-auto p-2 md:m-10'>
                    <div>
                        <h1 className='text-2xl md:text-4xl md:py-5 font-semibold'>Account Setting</h1>
                    </div>

                    <div className='md:flex bg-slate-100 dark:bg-gray-900 mt-3 md:mt-0 p-5 rounded-md md:h-[50vh]'>
                        <div className='md:flex w-full'>

                            <div className='profile-img flex justify-center items-center gap-3'>
                                {/* <div className=' md:mt-12 rounded-full border-2 md:m-5 md:ml-10 bg-white overflow-hidden '>
                                    {avatar ? <img src={avatar} alt="profile" className='w-full h-full object-cover' loading="lazy" /> : <FaUserSecret size="5em" className='text-black' />}
                                </div> */}



                                {/* profile toggle */}

                                <div className="cursor-pointer relative" onClick={() => setShowModal(true)}>
                                    <div className="h-[100px] w-[100px] md:h-[25vh] md:w-[13vw] md:m-5 md:ml-10 border-4 border-orange-500 rounded-full overflow-hidden ">
                                        {preview && (
                                            <img src={preview} alt="Selected Avatar" className="w-44 h-44 rounded-full mx-auto mb-4 border-2 border-gray-300" />
                                        )}

                                    </div>
                                    <div className="flex absolute md:bottom-5 md:right-10 bottom-0 right-1 bg-white rounded-full justify-center items-center gap-2">
                                        <IoCreateOutline size="1.5em" className="md:text-xl text-sm text-black m-1" />
                                        {/* <span className="text-blue-500">Edit</span> */}
                                    </div>
                                </div>

                                {/* File Input (Hidden) */}
                                <input type="file" accept="image/*" onChange={handleImageChange} onClick={(e) => { e.target.value = null; }} className="hidden" id="imageUpload" />

                                {/* Modal */}
                                {showModal && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="dark:bg-gray-900 bg-slate-100 p-6 rounded-lg shadow-lg w-96">
                                            <div className='border-2 rounded-full cursor-pointer w-min p-1' onClick={() => setShowModal(false)}>
                                                <RxCross2 />
                                            </div>
                                            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile Picture</h2>
                                            <img src={preview} alt="Selected Avatar" className="w-40 h-40 rounded-full mx-auto mb-4 border-2 border-gray-300" />
                                            <div className="flex justify-center gap-4">
                                                <label htmlFor="imageUpload" className="px-3 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer">
                                                    <LuUpload />
                                                </label>
                                                <label htmlFor="deleteImage" onClick={removeProfile} className="px-3 py-3 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
                                                    <RiDeleteBin6Line />
                                                </label>
                                                <button onClick={updateProfile} className="px-4 py-2 bg-orange-600 text-white rounded cursor-pointer hover:bg-orange-700">
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}









                                <div className='flex flex-col gap-0 '>
                                    <h1 className='text-2xl md:hidden md:text-5xl text-center font-semibold'>{username ? username : 'USER'}</h1>
                                    <h1 className='text-lg border md:hidden text-center text-gray-500 font-semibold'>Status :<span className={`inline rounded-full ml-1 mt-1  ${status ? 'text-green-500' : 'text-red-500'}`}>{status ? "Active" : "Inactive"}</span></h1>
                                </div>

                            </div>

                            <div className='flex flex-col user-content  w-full'>
                                <div className='content md:flex justify-around  h-full'>

                                    <div className='details md:flex flex-col my-auto gap-3'>
                                        <div>
                                            <h1 className='hidden md:block text-2xl md:text-5xl text-center font-semibold'>{username ? username : 'USER'}</h1>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <h1 className='text-2xl hidden md:block text-center text-gray-500 font-semibold'>Status</h1><span className={`w-4 h-4 rounded-full ml-3 mt-1 hidden md:block  ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        </div>
                                        <div className='position mt-5 md:mt-0'>
                                            <h3 className='text-sm text-center text-gray-500 font-semibold'>Founder of Loveense</h3>
                                        </div>
                                        <div className='location flex justify-center gap-2 mt-1 md:mt-0'>
                                            <h3 className='text-sm text-center text-gray-500 font-semibold inline'>{location ? location.country : "Mirzapur"}
                                            </h3>
                                            <img className='rounded-full inline h-[20px]' src={`${loc_image}`} alt="loc_image" loading="lazy" />
                                        </div>
                                    </div>

                                    <div className='links my-auto'>
                                        <div className="md:mt-5">

                                            {isEditing && (
                                                <div className="absolute w-[30vw] shadow-lg bg-white dark:bg-gray-800 top-[40vh] left-1/2 transform -translate-x-1/2 p-5 flex flex-col">
                                                    <div className='flex'>
                                                        <span className='bg-slate-100 dark:bg-gray-600 p-3 mb-3 rounded-l-md'>
                                                            <FaLink size="1.3em" className="text-xl" />
                                                        </span>
                                                        <input
                                                            type='text'
                                                            placeholder='Enter your link'
                                                            value={inputText}
                                                            onChange={(e) => setInputText(e.target.value)}
                                                            className='border p-2 mb-3 w-full dark:border-l-0 focus:outline-none dark:bg-gray-800'
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

                                <div className='buttons md:flex p-4 justify-center '>
                                    <div className='flex text-lg font-semibold gap-5 bg-white dark:text-black px-5 '>
                                        <h1 className='md:p-3 py-1 border-r-2 dark:border-gray-600'>48 Followers</h1>
                                        <h1 className='md:p-3 py-1'>166 Following</h1>
                                    </div>

                                    {name == name ? <Button className='rounded-sm mt-4 md:mt-0' onClick={handleClick}>Edit Details</Button> : <Button className='rounded-none px-11'>Follow +</Button>}

                                    {click && (
                                        <div className='absolute top-2/3 shadow-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-5'>
                                            <div className='fields p-4 flex flex-col gap-y-5'>
                                                <div className='mb-4 flex items-center'>
                                                    <label className='inline-block text-gray-600 dark:text-gray-300 text-lg font-semibold' htmlFor='email'>Email</label>
                                                    <input type='email' id='email' className='border-b-2 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:border-orange-400 ml-auto' placeholder={email ? email : 'Enter your email'} />
                                                </div>

                                                <div className='mb-4 flex items-center gap-10'>
                                                    <label className='inline-block text-gray-600 dark:text-gray-300 text-lg font-semibold' htmlFor='name'>Name</label>
                                                    <input type='text' id='name' className='border-b-2 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:border-orange-400 ml-auto' placeholder={name ? name : 'Enter your name'} />
                                                </div>

                                                <div className='mb-4 flex items-center gap-10'>
                                                    <label className='inline-block text-gray-600 dark:text-gray-300 text-lg font-semibold' htmlFor='username'>Username</label>
                                                    <input type='text' id='username' className='border-b-2 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={name ? name : 'Enter your username'} />
                                                </div>

                                                <div className='mb-4 flex items-center gap-10'>
                                                    <label className='inline-block text-gray-600 dark:text-gray-300 text-lg font-semibold' htmlFor='contact'>Contact</label>
                                                    <input type='tel' id='contact' className='border-b-2 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={phone ? phone : 'Enter your contact no.'} />
                                                </div>

                                                <div className='mb-4 flex items-center gap-10'>
                                                    <label className='inline-block text-gray-600 dark:text-gray-300 text-lg font-semibold' htmlFor='password'>Password</label>
                                                    <input type='password' id='password' className='border-b-2 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:border-orange-400  ml-auto' placeholder={password ? password : 'Enter passcode'} />
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

                    <div className='bg-slate-50 dark:bg-gray-800 p-5'>
                        <MyBlogs />
                    </div>
                </div>
            }

        </div>
    )
}

