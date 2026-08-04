import React, { useEffect, useState } from 'react';
import Container from '../container/Container';
import PostForm from '../layout/PostForm';
import appwriteService from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../layout/Loader';
import { useSelector } from 'react-redux';

function EditPost() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }
    setLoading(true);
    appwriteService
      .getPost(slug)
      .then((p) => {
        if (p) {
          // optional ownership guard
          if (userData && String(p.userid) !== String(userData._id)) {
            setError('You are not allowed to edit this post');
            return;
          }
          setPost(p);
        } else {
          navigate('/');
        }
      })
      .catch(() => {
        setError('Failed to load post');
      })
      .finally(() => setLoading(false));
  }, [slug, navigate, userData]);

  if (loading) {
    return (
      <LoadingComponent isContentLoaded={false} progress={40} setProgress={() => { }} />
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
        <button
          type="button"
          className="mt-4 text-orange-500 underline"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 px-4">Edit post</h1>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;