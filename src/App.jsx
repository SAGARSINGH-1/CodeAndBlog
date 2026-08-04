import React, { useState, useEffect } from 'react';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CreatePost from './components/layout/CreatePost';
import { useDispatch } from 'react-redux';
import { AiFillGithub } from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs sm:text-sm md:px-6">
          <p className="font-medium">
            Star on GitHub — contributions help improve CodeAndBlog
          </p>
          <NavLink
            target="_blank"
            to="https://github.com/SAGARSINGH-1/CodeAndBlog"
            className="inline-flex items-center gap-1 rounded-lg border border-white/30 bg-white/10 px-2.5 py-1 font-semibold backdrop-blur transition hover:bg-white/20"
          >
            Star <AiFillGithub className="text-base" />
          </NavLink>
        </div>
      </div>

      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CreatePost />
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'text-sm',
          style: {
            borderRadius: '12px',
            background: '#18181b',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;