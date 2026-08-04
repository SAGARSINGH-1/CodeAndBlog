import React, { useEffect, useState } from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { IoClose, IoMenu } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive
    ? 'text-orange-600 dark:text-orange-400'
    : 'text-slate-600 hover:text-orange-500 dark:text-zinc-300 dark:hover:text-orange-400'
  }`;

export default function Navbar() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const username = userData?.name || '';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored === 'dark' || (!stored && systemDark);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const themeSwitch = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  const closeAll = () => {
    setMobileOpen(false);
    setIsDropdownOpen(false);
  };

  const AccountMenu = () => (
    <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft dark:border-zinc-700 dark:bg-zinc-900">
      <NavLink to={`/user/${username || userData?._id}`} onClick={closeAll} className="block px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-zinc-800">
        Account
      </NavLink>
      <NavLink to="/my-blogs" onClick={closeAll} className="block px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-zinc-800">
        My Blogs
      </NavLink>
      <NavLink to="/add-post" onClick={closeAll} className="block px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-zinc-800">
        Create Post
      </NavLink>
      <NavLink to="/setting" onClick={closeAll} className="block px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-zinc-800">
        Settings
      </NavLink>
      <div className="border-t border-slate-100 p-2 dark:border-zinc-800">
        <LogoutBtn />
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <NavLink to="/" onClick={closeAll} className="flex items-center gap-2">
          <img
            className="h-8"
            src={isDark ? '/Logo.png' : '/Logo d.png'}
            alt="CodeAndBlog"
            loading="lazy"
          />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/help" className={navLinkClass}>Help</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={themeSwitch}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-orange-300 hover:text-orange-600 dark:border-zinc-700 dark:text-zinc-300"
            aria-label="Toggle theme"
          >
            {isDark ? <BsSunFill size={16} /> : <BsFillMoonStarsFill size={16} />}
          </button>

          {authStatus ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((v) => !v)}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-2 py-1.5 dark:border-zinc-700"
              >
                <FaUserCircle size={22} className="text-slate-500" />
                <span className="max-w-[100px] truncate text-sm font-medium">{username || 'You'}</span>
                <MdOutlineArrowDropDown size={20} />
              </button>
              {isDropdownOpen && <AccountMenu />}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <NavLink to="/login">
                <Button variant="ghost">Log in</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button>Sign up</Button>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="rounded-xl p-2 text-slate-700 md:hidden dark:text-zinc-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" onClick={closeAll} className={navLinkClass}>Home</NavLink>
            <NavLink to="/blogs" onClick={closeAll} className={navLinkClass}>Blogs</NavLink>
            <NavLink to="/about" onClick={closeAll} className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" onClick={closeAll} className={navLinkClass}>Contact</NavLink>
            <NavLink to="/help" onClick={closeAll} className={navLinkClass}>Help</NavLink>
            {authStatus ? (
              <>
                <NavLink to="/my-blogs" onClick={closeAll} className={navLinkClass}>My Blogs</NavLink>
                <NavLink to="/add-post" onClick={closeAll} className={navLinkClass}>Create Post</NavLink>
                <NavLink to="/setting" onClick={closeAll} className={navLinkClass}>Settings</NavLink>
                <LogoutBtn />
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <NavLink to="/login" onClick={closeAll} className="flex-1">
                  <Button variant="outline" className="w-full">Log in</Button>
                </NavLink>
                <NavLink to="/signup" onClick={closeAll} className="flex-1">
                  <Button className="w-full">Sign up</Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}