// src/components/Comment.js

import React, { useState } from 'react';

const Comment = () => {

    function handleAddReply(){
        console.log("hello");
    }

  return (
    <div className="comment bg-white border border-gray-300 p-6 mb-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800"></h3>
      <div className="mt-4">
      </div>
      <form className="mt-6" onSubmit={handleAddReply}>
        <label className="block text-gray-700 font-semibold mb-2">Add Reply:</label>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
          rows="3"
          placeholder="Write your reply here..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full px-6 py-3 mt-4 hover:bg-blue-700 focus:outline-none"
        >
          Post Reply
        </button>
      </form>
    </div>
  );
};

export default Comment;
