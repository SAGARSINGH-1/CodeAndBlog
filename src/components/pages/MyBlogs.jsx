import React from 'react'
import appwriteService from "../../appwrite/config";
import Post from './Post';
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
                setPost(posts.documents.filter((post) => { post.name === userData.userData.name }));
            }
        });
    }, []);

    return (
        <Container>
            <div className='posts'>
                {
                    mypost.map((post) => {
                        <div>{console.log(post)}</div>
                    })
                }
            </div>
        </Container>
    )
}

export default MyBlogs