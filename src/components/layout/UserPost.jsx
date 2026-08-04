import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import appwriteService from '../../appwrite/config';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { CiEdit } from 'react-icons/ci';

function UserPost({
  slug,
  $id,
  title,
  featuredImage,
  featuredImageUrl,
  name,
  content,
  profileImageId,
  profileImageUrl,
  createdAt,
}) {
  const postSlug = slug || $id;
  const userData = useSelector((state) => state.auth.userData);
  const description = typeof content === 'string' ? parse(content) : content;

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 30) + 1);
  const [commentCount] = useState(Math.floor(Math.random() * 20) + 1);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikeCount((n) => (isHeartFilled ? n - 1 : n + 1));
    setIsHeartFilled((v) => !v);
  };

  const dateLabel = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '';

  const imageSrc = appwriteService.getFilePreview(featuredImageUrl || featuredImage);
  const avatarSrc = appwriteService.getProfilePreview(profileImageUrl || profileImageId);

  return (
    <article className="card-hover mb-5 overflow-hidden p-4 md:p-5">
      <Link to={`/post/${postSlug}`} className="block">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-700">
              {avatarSrc ? (
                <img src={avatarSrc} className="h-full w-full object-cover" alt="" />
              ) : (
                <span className="text-sm font-semibold text-slate-600 dark:text-zinc-300">
                  {(name || 'U')[0].toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {name || 'User'}
              </p>
              {dateLabel && <p className="text-xs text-slate-400">{dateLabel}</p>}
            </div>
          </div>
          {userData?.name === name && (
            <Link
              to={`/edit-post/${postSlug}`}
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-1.5 text-orange-500 transition hover:bg-orange-50 dark:hover:bg-orange-500/10"
            >
              <CiEdit className="text-xl" />
            </Link>
          )}
        </div>

        <h2 className="mb-2 text-lg font-bold leading-snug text-slate-900 dark:text-white md:text-xl">
          {title}
        </h2>
        <div className="line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
          {description}
        </div>

        {imageSrc && (
          <div className="mt-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">
            <img
              className="max-h-72 w-full object-cover"
              src={imageSrc}
              alt={title}
              loading="lazy"
            />
          </div>
        )}
      </Link>

      <div className="mt-4 flex items-center justify-around border-t border-slate-100 pt-3 text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
        <button
          type="button"
          onClick={handleLike}
          className="flex items-center gap-1.5 text-sm transition hover:text-orange-500"
        >
          {isHeartFilled ? (
            <FaHeart color="#f97316" size="1.05em" />
          ) : (
            <AiOutlineHeart size="1.15em" />
          )}
          {likeCount}
        </button>
        <Link
          to={`/post/${postSlug}`}
          className="flex items-center gap-1.5 text-sm transition hover:text-orange-500"
        >
          <FiMessageSquare size="1.15em" />
          {commentCount}
        </Link>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm transition hover:text-orange-500"
        >
          <FiShare2 size="1.1em" />
        </button>
      </div>
    </article>
  );
}

export default UserPost;