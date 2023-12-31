import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import React, { useState } from 'react';
import Button from "./Button";

const Comment = ({ postid, title, refreshcomment }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [replyText, setReplyText] = useState('');

  function handleAddReply(e) {
    e.preventDefault();
    
    // Check if userData is available before accessing its properties
    if (userData && userData.userData) {
      const commentData = {
        userid: userData.userData.$id,
        name: userData.userData.name,
        comment: replyText,
        postid: postid, // Assuming the text of the reply is stored in the 'comment' property
      };
      
      //console.log(commentData);
      appwriteService.createComment(commentData);
      
      // Reset the textarea after submitting the reply
      setReplyText('');
    }
  }

  return (
    <div className="comment bg-white border border-gray-300 p-6 mb-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Comment Title</h3>
      {/* Populate this div with comment content and replies */}
      <div className="mt-4">
        {/* Content goes here */}
      </div>
      <form className="mt-6" onSubmit={(e) => handleAddReply(e)}>
        <label className="block text-gray-700 font-semibold mb-2">Add Reply:</label>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none resize-none"
          rows="3"
          placeholder="Write your reply here..."
          name="comment"
        />
     
     <div className="flex justify-end">
      <Button type="submit" onClick={refreshcomment} className="m-3">Post Reply</Button>
    </div>
     
      </form>
    </div>
  );
};

export default Comment;
