import React from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'How do I create a post?',
    a: 'Log in, click Create Post (bottom-right or menu), fill title, content, optional image, and submit.',
  },
  {
    q: 'Why did my image upload fail?',
    a: 'The server needs valid Cloudinary credentials (CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET). Without them, uploads return an error.',
  },
  {
    q: 'How do I reset my password?',
    a: 'Use Forgot password on the login page. Check the backend server logs for the reset link until email is configured.',
  },
  {
    q: 'Can I edit or delete a post?',
    a: 'Only the author can edit or delete. Open your post and use the edit / delete controls, or go to My Blogs.',
  },
];

export default function Help() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Help</h1>
      <div className="space-y-6">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="bg-slate-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="font-semibold text-lg mb-2">{item.q}</h2>
            <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-gray-500">
        Still stuck?{' '}
        <Link to="/contact" className="text-orange-500 underline">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
