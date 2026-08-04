import appwriteService from '../../appwrite/config';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Button from './Button';

const Comment = ({ postid, onAdded }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleAddReply(e) {
    e.preventDefault();
    if (!userData?._id) return;
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      await appwriteService.createComment({
        postid, // should be the post slug
        comment: replyText.trim(),
      });
      setReplyText('');
      if (typeof onAdded === 'function') onAdded();
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!userData) {
    return (
      <p className="text-sm text-gray-500 mx-2">Log in to leave a comment.</p>
    );
  }

  return (
    <div className="comment mx-2 bg-white border dark:text-white dark:bg-black border-gray-300 p-6 mb-6 rounded-lg shadow-lg">
      <form className="mt-2" onSubmit={handleAddReply}>
        <label className="block text-gray-700 font-semibold mb-2 dark:text-white">
          Add a comment
        </label>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full border border-gray-300 dark:bg-black p-3 rounded-md focus:outline-none resize-none"
          rows="3"
          placeholder="Write your comment here..."
          name="comment"
        />
        <div className="flex justify-end">
          <Button type="submit" className="m-3" disabled={submitting}>
            {submitting ? 'Posting…' : 'Post Comment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Comment;