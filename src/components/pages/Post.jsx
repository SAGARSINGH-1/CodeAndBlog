import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../../appwrite/config';
import Container from '../container/Container';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import Button from '../layout/Button';
import Comment from '../layout/AddComment';
import { LuRefreshCcw } from 'react-icons/lu';
import { FaArrowLeftLong } from 'react-icons/fa6';
import LoadingComponent from '../layout/Loader';
import Otheruser from '../layout/Otheruser';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Post() {
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(false);
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (post && userData) {
      setIsAuthor(String(post.userid) === String(userData._id));
      loadComments();
    }
  }, [post, userData]);

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((p) => {
          if (p) setPost(p);
          else navigate('/');
        })
        .catch(() => navigate('/'));
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const loadComments = () => {
    if (!post?.slug && !post?.postid) return;
    setRefresh(true);
    // comments are keyed by post slug (postid field in Comment model)
    const postKey = post.slug || post.postid;
    appwriteService
      .getComments(postKey)
      .then((res) => {
        if (res) setComments(res.documents || []);
      })
      .finally(() => setRefresh(false));
  };

  const deletePost = () => {
    if (!post?.slug) return;
    appwriteService.deletePost(post.slug).then((status) => {
      if (status) navigate('/');
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setContentLoaded(true), 800);
    const intervalId = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 40) + 1, 100));
    }, 200);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageSrc = post
    ? appwriteService.getFilePreview(post.featuredImageUrl || post.featuredImage)
    : null;
  const avatarSrc = post
    ? appwriteService.getProfilePreview(post.profileImageUrl || post.profileImageId)
    : null;

  return post ? (
    <div>
      {isContentLoaded ? (
        <div className="md:py-8 md:px-10">
          <Container>
            <div className="md:flex justify-between md:gap-5">
              <div className="flex flex-col flex-1">
                <div className="relative h-[55px]">
                  <NavLink to="/blogs">
                    <button className="absolute text-black bg-[whitesmoke] dark:bg-white rounded-full p-4 hover:translate-x-[-3px] transition-all ease-in-out">
                      <FaArrowLeftLong size="1em" />
                    </button>
                  </NavLink>
                </div>

                <div className="flex m-3 ml-5 items-center">
                  <div
                    onClick={() => setProfile(!profile)}
                    className="cursor-pointer rounded-full bg-gray-300 dark:bg-white w-12 h-12 mr-3 overflow-hidden"
                  >
                    {avatarSrc ? (
                      <img src={avatarSrc} className="rounded-full w-full h-full object-cover" alt="" />
                    ) : null}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{post.name}</h2>
                    {post.createdAt && (
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {isAuthor && (
                    <div className="ml-auto flex gap-2">
                      <Link to={`/edit-post/${post.slug}`}>
                        <CiEdit className="text-2xl text-orange-500 hover:scale-110" />
                      </Link>
                      <button onClick={deletePost} type="button">
                        <AiOutlineDelete className="text-2xl text-red-500 hover:scale-110" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-full mb-6">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={post.title}
                      className="rounded-xl max-h-[480px] w-full object-cover"
                    />
                  )}
                </div>

                <div className="w-full mb-6">
                  <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                  <div className="browser-css prose dark:prose-invert max-w-none">
                    {parse(post.content)}
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
                    <button
                      type="button"
                      onClick={loadComments}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      disabled={refresh}
                    >
                      <LuRefreshCcw className={refresh ? 'animate-spin' : ''} />
                    </button>
                  </div>
                  <Comment postid={post.slug} onAdded={loadComments} />
                  <div className="mt-4 space-y-3">
                    {comments.map((c) => (
                      <div
                        key={c._id}
                        className="bg-slate-100 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="text-gray-600 dark:text-gray-300">{c.comment}</p>
                        {c.createdAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(c.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!isMobile && (
                <div className="md:w-[280px]">
                  <Otheruser
                    userid={post.userid}
                    name={post.name}
                    profileImageUrl={post.profileImageUrl}
                    profileImageId={post.profileImageId}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <LoadingComponent
          isContentLoaded={isContentLoaded}
          progress={progress}
          setProgress={setProgress}
        />
      )}
    </div>
  ) : (
    <LoadingComponent isContentLoaded={false} progress={progress} setProgress={setProgress} />
  );
}