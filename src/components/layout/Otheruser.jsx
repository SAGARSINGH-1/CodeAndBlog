import React, { useEffect, useState } from 'react';
import appwriteService from '../../appwrite/config';
import Button from '../layout/Button';
import { FaFacebookF, FaLinkedin, FaUserSecret, FaXTwitter, FaLink } from 'react-icons/fa6';
import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

/**
 * Sidebar card for a post author.
 * Prefer denormalized fields from the post (name, profileImageUrl).
 * Only hits GET /users/:id when a real Mongo _id is provided.
 */
export default function Otheruser({
  userid,
  name: nameProp,
  profileImageUrl,
  profileImageId,
  bio: bioProp,
}) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(nameProp || '');
  const [profilepicture, setProfilepicture] = useState(
    profileImageUrl || (profileImageId ? appwriteService.getProfilePreview(profileImageId) : null)
  );
  const [bio, setBio] = useState(bioProp || '');

  useEffect(() => {
    if (nameProp) setName(nameProp);
    if (profileImageUrl) {
      setProfilepicture(profileImageUrl);
    } else if (profileImageId) {
      setProfilepicture(appwriteService.getProfilePreview(profileImageId));
    }
    if (bioProp) setBio(bioProp);
  }, [nameProp, profileImageUrl, profileImageId, bioProp]);

  useEffect(() => {
    // Skip API if we already have display data from the post, or no id
    if (!userid) return;

    let cancelled = false;
    (async () => {
      const data = await appwriteService.getUser(userid);
      if (cancelled || !data) return;
      setUser(data);
      setName(data.name || nameProp || '');
      setBio(data.bio || bioProp || '');
      const url = data.profileImageUrl || data.profileImageId;
      if (url) setProfilepicture(appwriteService.getProfilePreview(url));
    })();

    return () => {
      cancelled = true;
    };
  }, [userid, nameProp, bioProp]);

  const displayName = name || user?.name || 'USER';
  const isActive = true; // online status not tracked on new backend

  return (
    <div>
      <div className="flex bg-slate-100 dark:bg-gray-900 h-auto min-h-[50vh] shadow-md shadow-orange-100 overflow-hidden rounded-xl">
        <div className="flex w-full flex-col items-center p-6">
          <div className="h-28 w-28 rounded-full border-2 border-orange-500 bg-white overflow-hidden flex items-center justify-center">
            {profilepicture ? (
              <img
                src={profilepicture}
                alt="profile"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <FaUserSecret size="3em" className="text-black" />
            )}
          </div>

          <h1 className="text-2xl text-center font-semibold mt-4">{displayName}</h1>
          <div className="flex items-center justify-center mt-1">
            <h1 className="text-base text-center text-gray-500 font-semibold">Status</h1>
            <span
              className={`block w-3 h-3 rounded-full ml-2 ${isActive ? 'bg-green-500' : 'bg-red-600'
                }`}
            />
          </div>

          {bio && (
            <p className="text-sm text-gray-500 text-center mt-3 px-2 line-clamp-4">{bio}</p>
          )}

          <div className="flex gap-3 mt-5 text-gray-600 dark:text-gray-300">
            <BsGithub size="1.2em" className="hover:text-orange-500" />
            <FaXTwitter size="1.2em" className="hover:text-orange-500" />
            <FaFacebookF size="1.2em" className="hover:text-orange-500" />
            <FaLinkedin size="1.2em" className="hover:text-orange-500" />
            <FaLink size="1.2em" className="hover:text-orange-500" />
          </div>

          {userid && (
            <Link to={`/user/${userid}`} className="mt-5">
              <Button>Visit Profile</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}