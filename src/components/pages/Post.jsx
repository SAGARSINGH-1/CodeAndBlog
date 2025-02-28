import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Container from '../container/Container'
import PostForm from '../layout/PostForm'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../layout/Button";
import Comment from "../layout/AddComment";
import { LuRefreshCcw } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoadingComponent from "../layout/Loader";
import Profile from "./userProfile";
import Otheruser from "../layout/Otheruser";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";


export default function Post() {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [isMobile, setIsMobile] = useState(false);        // For mobile view

    const userData = useSelector((state) => state.auth.userData);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (post && userData) {
            setIsAuthor(userData ? post.userid === userData.userData.userid : false);
            refreshcomment();
        }
    }, [post, userData]);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    let refreshcomment = () => {
        setRefresh(true)
        appwriteService.getComments(post?.postid).then((comments) => {
            if (comments) {
                setComments(comments.documents);
            }
            setRefresh(false)
        });
    }

    // top Loader
    const [isContentLoaded, setContentLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setContentLoaded(true);
        }, 2000);

        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                const randomIncrement = Math.floor(Math.random() * 50) + 1;
                const newProgress = Math.min(prevProgress + randomIncrement, 100);
                return newProgress;
            });
        }, 1000);

        // Clean up the timeout and interval when the component unmounts
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, []);


    const [profile, setProfile] = useState(false);

    const toggleProfile = () => {
        setProfile(!profile);
    };


    // For mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return post ? (
        <div>
            {isContentLoaded ? (
                <div className="md:py-8 md:px-10">
                    <Container>
                        <div className="md:flex justify-between md:gap-5">
                            <div className="flex flex-col">
                                <div className="relative h-[55px]"><NavLink to="/blogs"><button className="absolute text-black bg-[whitesmoke] dark:bg-white rounded-full p-4 hover:translate-x-[-3px] transition-all ease-in-out"><FaArrowLeftLong size="1em" /></button></NavLink></div>
                                <div className="flex m-3 ml-5">
                                    <div onClick={toggleProfile} className="cursor-pointer rounded-full  bg-gray-300 dark:bg-white w-12 h-12 mr-3">
                                        <FaUserCircle className="w-full h-full object-cover dark:text-black" />
                                    </div>

                                    <div className="absolute top-1/4 left-[22%] shadow-xl">
                                        {profile && (
                                            <div className="fixed z-[20]">
                                                <Otheruser userid={post.userid} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-2xl font-bold">{post.name}</div>
                                </div>

                                <div className="pl-5 mt-3">
                                    <div className=" mb-6">
                                        <h1 className="text-2xl font-bold">{post.title}</h1>
                                    </div>
                                    <div className="browser-css mb-5">
                                        {parse(post.content)}
                                    </div>
                                </div>

                                <div className="md:w-[50vw] flex justify-center mb-4 relative border rounded-xl p-2 ">
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="rounded-xl"
                                        loading="lazy"
                                    />

                                    {isAuthor && (
                                        <div className={`absolute ${isMobile ? 'right-2 top-[-15vw]' : 'right-6 top-6'}`}>
                                            <Link to={`/edit-post/${post.$id}`}>
                                                <Button bgColor="bg-orange-500" className={`mr-3 ${isMobile ? "bg-transparent" : ""}`}>
                                                    {
                                                        isMobile ? <CiEdit className='inline text-2xl hover:scale-110 text-gray-600 dark:text-white' /> : "Edit"
                                                    }
                                                </Button>
                                            </Link>
                                            <Button bgColor="bg-red-500" className={`${isMobile ? "bg-transparent" : ""}`} onClick={deletePost}>
                                                {
                                                    isMobile ? <AiOutlineDelete className='inline text-2xl hover:scale-110 text-gray-600 dark:text-white' /> : "Delete"
                                                }
                                            </Button>
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="p-2">
                                <div className="social-login-label relative">
                                    <span className="label-text relative z-10 inline-block px-2 bg-white text-gray-500 dark:text-white dark:bg-black font-semibold text-4xl m-5">Comments</span>
                                    <div className="absolute mt-5 top-0 right-0 mr-3 z-[1] bg-white float-right p-3 dark:text-white dark:bg-black"><button onClick={refreshcomment}><LuRefreshCcw className={`${refresh ? "rotate-180  transition-all ease-out" : ""}`} size="1.5em" /></button></div>
                                    <div className="absolute top-1/2 left-0 right-0 border-t-2 border-gray-300 mt-0.5"></div>
                                </div>

                                <div className=" md:w-[40vw] md:h-[90vh] overflow-auto scrollbar-none no-scrollbar dark:bg-black">
                                    {comments.length > 0 ? comments.map((comment) => (
                                        <div className="flex items-start border-2 p-2 pl-5 my-3 rounded-2xl bg-slate-50 dark:bg-black" key={comment.$id}>
                                            <div onClick={toggleProfile} className="cursor-pointer rounded-full overflow-hidden bg-gray-300 dark:text-white dark:bg-black w-12 h-12 mr-3">
                                                <FaUserCircle className="w-full h-full object-cover " />
                                            </div>

                                            {/* Comment Content */}
                                            <div className="ml-3">
                                                <h1 className="text-lg font-medium dark:text-white">{comment.name}</h1>
                                                <p className="text-gray-500 text-base ">{comment.comment}</p>
                                                {/* Additional content */}
                                            </div>
                                        </div>
                                    )) :
                                        <div className="flex justify-center items-center">
                                            <p className="text-xl">No Comments yet be First one</p>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>

                        <Comment postid={post.postid} refreshcomment={refreshcomment} />
                    </Container>
                </div>
            ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}
        </div>
    ) : null;
}
