import React, { useState, useEffect } from 'react';
import Button from '../layout/Button';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebookF, FaLinkedin, FaXTwitter, FaLink } from 'react-icons/fa6';
import { BsGithub } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import MyBlogs from './MyBlogs';
import LoadingComponent from '../layout/Loader';
import { IoCreateOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import appwriteService from '../../appwrite/config';
import toast from 'react-hot-toast';
import { LuUpload } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { login as setAuthUser } from '../../store/authSlice';

const DEFAULT_AVATAR =
  'https://i.pinimg.com/736x/4a/8d/49/4a8d49ad421e02dfb6105e912d721689.jpg';

export default function Profile() {
  // Flat user from authSlice (after migration)
  const authUser = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(DEFAULT_AVATAR);

  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState('');
  const [click, setClick] = useState(false);
  const [Links, setLinks] = useState([
    { type: 'github', url: '' },
    { type: 'twitter', url: '' },
    { type: 'facebook', url: '' },
    { type: 'linkedin', url: '' },
    { type: 'random', url: '' },
  ]);

  // Load profile from auth + optional GET /users/:id
  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    setUsername(authUser.name || '');
    setEmail(authUser.email || '');
    setUser(authUser);

    const avatar =
      authUser.profileImageUrl ||
      (authUser.profileImageId
        ? appwriteService.getProfilePreview(authUser.profileImageId)
        : null);
    setPreview(avatar || DEFAULT_AVATAR);

    const userId = authUser._id;
    if (userId) {
      appwriteService.getUser(userId).then((data) => {
        if (data) {
          setUser(data);
          setUsername(data.name || authUser.name || '');
          setEmail(data.email || authUser.email || '');
          const url =
            data.profileImageUrl ||
            (data.profileImageId
              ? appwriteService.getProfilePreview(data.profileImageId)
              : null);
          if (url) setPreview(url);
        }
      });
    }

    setLoading(false);
  }, [authUser]);

  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 400);
    return () => clearTimeout(t);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    const valid = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!valid.includes(file.type)) {
      toast.error('Invalid image format');
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setShowModal(true);
  };

  const updateProfile = async () => {
    const userId = authUser?._id || user?._id;
    if (!imageFile || !userId) {
      toast.error('Please select a file');
      return;
    }
    try {
      // Backend route: POST /users/:id/profile-image  → { $id, url }
      const data = await appwriteService.uploadProfileImage(imageFile, userId);
      if (data) {
        const fileId = data.$id;
        const url = data.url;
        setPreview(url || appwriteService.getProfilePreview(fileId));
        setShowModal(false);
        setImageFile(null);

        // Keep Redux in sync
        const updated = {
          ...(authUser || {}),
          profileImageId: fileId,
          profileImageUrl: url,
        };
        setUser(updated);
        dispatch(setAuthUser(updated));

        // Propagate avatar onto author's posts
        await appwriteService
          .updateArticleProfileId(userId, {
            profileImageId: fileId,
            profileImageUrl: url,
          })
          .catch(() => {});
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeProfile = async () => {
    const userId = authUser?._id || user?._id;
    const imageId = user?.profileImageId || authUser?.profileImageId;
    if (!imageId) {
      toast.error('No profile image found to delete.');
      return;
    }
    try {
      await appwriteService.deleteProfile(imageId);
      await appwriteService.updateUserProfile(userId, {
        profileImageId: null,
        profileImageUrl: null,
      });
      setPreview(DEFAULT_AVATAR);
      setImageFile(null);
      const updated = {
        ...(authUser || {}),
        profileImageId: null,
        profileImageUrl: null,
      };
      setUser(updated);
      dispatch(setAuthUser(updated));
      toast.success('Profile image removed successfully.');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to remove profile image:', error);
    }
  };

  const handleSaveClick = () => {
    const lower = inputText.toLowerCase();
    setLinks((prev) => {
      const next = prev.map((l) => ({ ...l }));
      if (lower.includes('github')) next[0].url = inputText;
      else if (lower.includes('twitter') || lower.includes('x.com'))
        next[1].url = inputText;
      else if (lower.includes('facebook')) next[2].url = inputText;
      else if (lower.includes('linkedin')) next[3].url = inputText;
      else next[4].url = inputText;
      return next;
    });
    setInputText('');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <LoadingComponent
        isContentLoaded={false}
        progress={progress}
        setProgress={setProgress}
      />
    );
  }

  return (
    <div>
      <div className="md:w-[70vw] w-[100vw] md:mx-auto p-2 md:m-10">
        <div>
          <h1 className="text-2xl md:text-4xl md:py-5 font-semibold">Account Setting</h1>
        </div>

        <div className="md:flex bg-slate-100 dark:bg-gray-900 mt-3 md:mt-0 p-5 rounded-md md:min-h-[40vh]">
          <div className="md:flex w-full">
            <div className="profile-img flex justify-center items-center gap-3">
              <div className="cursor-pointer relative" onClick={() => setShowModal(true)}>
                <div className="h-[100px] w-[100px] md:h-[25vh] md:w-[13vw] md:m-5 md:ml-10 border-4 border-orange-500 rounded-full overflow-hidden">
                  <img
                    src={preview}
                    alt="Selected Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex absolute md:bottom-5 md:right-10 bottom-0 right-1 bg-white rounded-full justify-center items-center gap-2">
                  <IoCreateOutline size="1.5em" className="md:text-xl text-sm text-black m-1" />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                onClick={(e) => {
                  e.target.value = null;
                }}
                className="hidden"
                id="imageUpload"
              />

              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="dark:bg-gray-900 bg-slate-100 p-6 rounded-lg shadow-lg w-96">
                    <div
                      className="border-2 rounded-full cursor-pointer w-min p-1"
                      onClick={() => setShowModal(false)}
                    >
                      <RxCross2 />
                    </div>
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Edit Profile Picture
                    </h2>
                    <img
                      src={preview}
                      alt="Selected Avatar"
                      className="w-40 h-40 rounded-full mx-auto mb-4 border-2 border-gray-300 object-cover"
                    />
                    <div className="flex justify-center gap-4">
                      <label
                        htmlFor="imageUpload"
                        className="px-3 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
                      >
                        <LuUpload />
                      </label>
                      <button
                        type="button"
                        onClick={removeProfile}
                        className="px-3 py-3 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        type="button"
                        onClick={updateProfile}
                        className="px-4 py-2 bg-orange-600 text-white rounded cursor-pointer hover:bg-orange-700"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-0">
                <h1 className="text-2xl md:hidden text-center font-semibold">
                  {username || 'USER'}
                </h1>
                <h1 className="text-lg border md:hidden text-center text-gray-500 font-semibold">
                  Status :{' '}
                  <span className={`inline ${status ? 'text-green-500' : 'text-red-500'}`}>
                    {status ? 'Active' : 'Inactive'}
                  </span>
                </h1>
              </div>
            </div>

            <div className="flex flex-col user-content w-full">
              <div className="content md:flex justify-around h-full">
                <div className="details md:flex flex-col my-auto gap-3">
                  <div>
                    <h1 className="hidden md:block text-2xl md:text-5xl text-center font-semibold">
                      {username || 'USER'}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center">
                    <h1 className="text-2xl hidden md:block text-center text-gray-500 font-semibold">
                      Status
                    </h1>
                    <span
                      className={`w-4 h-4 rounded-full ml-3 mt-1 hidden md:block ${
                        status ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  {email && (
                    <p className="text-sm text-center text-gray-500">{email}</p>
                  )}
                </div>

                <div className="links my-auto">
                  <div className="md:mt-5">
                    {isEditing && (
                      <div className="absolute w-[30vw] shadow-lg bg-white dark:bg-gray-800 top-[40vh] left-1/2 transform -translate-x-1/2 p-5 flex flex-col z-40">
                        <div className="flex">
                          <span className="bg-slate-100 dark:bg-gray-600 p-3 mb-3 rounded-l-md">
                            <FaLink size="1.3em" />
                          </span>
                          <input
                            type="text"
                            placeholder="Enter your link"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="border p-2 mb-3 w-full dark:border-l-0 focus:outline-none dark:bg-gray-800"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="mr-3 px-4 py-2 bg-orange-500 text-white rounded-md"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 justify-center">
                      {Links.map(
                        (link) =>
                          link.url && (
                            <NavLink
                              key={link.type}
                              to={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.type === 'github' && (
                                <BsGithub size="1.5em" className="mr-3 hover:text-orange-500" />
                              )}
                              {link.type === 'twitter' && (
                                <FaXTwitter size="1.5em" className="mr-3 hover:text-orange-500" />
                              )}
                              {link.type === 'facebook' && (
                                <FaFacebookF size="1.5em" className="mr-3 hover:text-orange-500" />
                              )}
                              {link.type === 'linkedin' && (
                                <FaLinkedin size="1.5em" className="mr-3 hover:text-orange-500" />
                              )}
                              {link.type === 'random' && (
                                <FaLink size="1.5em" className="mr-3 hover:text-orange-500" />
                              )}
                            </NavLink>
                          )
                      )}
                    </div>

                    <div className="flex justify-center mt-5">
                      <Button onClick={() => setIsEditing((v) => !v)}>Add Links</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons md:flex p-4 justify-center">
                <div className="flex text-lg font-semibold gap-5 bg-white dark:text-black px-5">
                  <h1 className="md:p-3 py-1 border-r-2 dark:border-gray-600">— Followers</h1>
                  <h1 className="md:p-3 py-1">— Following</h1>
                </div>
                <Button className="rounded-sm mt-4 md:mt-0" onClick={() => setClick((v) => !v)}>
                  Edit Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-gray-800 p-5 mt-4">
          <MyBlogs />
        </div>
      </div>
    </div>
  );
}