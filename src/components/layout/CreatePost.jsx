import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreatePost() {
  const authStatus = useSelector((state) => state.auth.status);
  if (!authStatus) return null;

  return (
    <NavLink
      to="/add-post"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 hover:shadow-xl"
    >
      <IoCreateOutline className="text-xl" />
      <span className="hidden sm:inline">Create Post</span>
    </NavLink>
  );
}

export default CreatePost;