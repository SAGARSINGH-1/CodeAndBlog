import React, { useState } from 'react';
import Button from '../layout/Button';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    // No backend contact endpoint yet — acknowledge locally
    toast.success('Thanks! We received your message.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact us</h1>
      <p className="text-gray-500 mb-8">Questions, feedback, or partnership ideas — drop a note.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2 dark:bg-gray-900 focus:outline-none focus:border-orange-400"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2 dark:bg-gray-900 focus:outline-none focus:border-orange-400"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2 dark:bg-gray-900 focus:outline-none focus:border-orange-400 resize-none"
            placeholder="How can we help?"
          />
        </div>
        <Button type="submit">Send message</Button>
      </form>
    </div>
  );
}