import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../layout/Button';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About CodeAndBlog</h1>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        CodeAndBlog is a space for developers and writers to share tutorials, stories, and ideas.
        Publish articles, explore what others are building, and grow with the community.
      </p>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        This project uses a React frontend and an Express + MongoDB API with Cloudinary for images.
      </p>
      <div className="flex gap-3">
        <Link to="/blogs">
          <Button>Explore blogs</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-gray-700">Join us</Button>
        </Link>
      </div>
    </div>
  );
}