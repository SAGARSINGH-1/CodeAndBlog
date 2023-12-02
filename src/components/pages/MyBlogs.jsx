import React from 'react';
import appwriteService from "../../appwrite/config";
import UserPost from "../userBlog/userPost";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/Container';

function MyBlogs() {
    const userData = useSelector((state) => state.auth.userData);

    const [mypost, setPost] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                // Filter posts by userid and update the state
                setPost(posts.documents.filter((post) => post.name === userData.userData.name));
            }
        });
    }, [userData.userData.name]);

    return (
        <Container>
            <div className='posts'>
                {mypost.map((post) => (
                    <UserPost key={post.id} {...post} />
                ))}
            </div>
        </Container>
    );
}

export default MyBlogs;
