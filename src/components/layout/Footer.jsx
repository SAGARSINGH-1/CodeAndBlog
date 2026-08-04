import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaXTwitter, FaFacebookF, FaLinkedin } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  const linkClass =
    'text-sm text-zinc-400 transition hover:text-orange-400';

  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <img className="mb-4 h-9" src="/Logo.png" alt="CodeAndBlog" loading="lazy" />
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Explore, connect, and share. A home for developers and writers to publish
              stories, tutorials, and ideas.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
              Menu
            </h4>
            <ul className="space-y-2">
              <li><NavLink className={linkClass} to="/">Home</NavLink></li>
              <li><NavLink className={linkClass} to="/blogs">Blogs</NavLink></li>
              <li><NavLink className={linkClass} to="/about">About</NavLink></li>
              <li><NavLink className={linkClass} to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
              Resources
            </h4>
            <ul className="space-y-2">
              <li><NavLink className={linkClass} to="/help">Help</NavLink></li>
              <li><NavLink className={linkClass} to="/add-post">Write a post</NavLink></li>
              <li><NavLink className={linkClass} to="/signup">Join</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
              Get in touch
            </h4>
            <p className="text-sm text-zinc-400">hello@codeandblog.dev</p>
            <div className="mt-4 flex gap-3 text-zinc-400">
              <a href="https://github.com/SAGARSINGH-1/CodeAndBlog" target="_blank" rel="noreferrer" className="hover:text-white"><BsGithub size={18} /></a>
              <span className="hover:text-white cursor-default"><FaXTwitter size={18} /></span>
              <span className="hover:text-white cursor-default"><FaFacebookF size={18} /></span>
              <span className="hover:text-white cursor-default"><FaLinkedin size={18} /></span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {year} CodeAndBlog. All rights reserved.</p>
          <p>Built for writers & developers</p>
        </div>
      </div>
    </footer>
  );
}