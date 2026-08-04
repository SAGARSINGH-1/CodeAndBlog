import React, { useEffect, useState } from 'react';
import { Category } from '../Blog/BlogData';
import { CiSearch } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import Button from '../layout/Button';
import UserPost from '../layout/UserPost';
import Container from '../container/Container';
import appwriteService from '../../appwrite/config';
import LoadingComponent from '../layout/Loader';

export default function UserBlog() {
  const [category] = useState(Category);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState('');
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    appwriteService
      .getPosts({ status: 'active' })
      .then((posts) => {
        if (posts?.documents) setPost(posts.documents);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setContentLoaded(true), 400);
    const i = setInterval(() => setProgress((p) => Math.min(p + 20, 100)), 100);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  const filtered = search.trim()
    ? post.filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.content?.toLowerCase().includes(search.toLowerCase())
    )
    : post;

  if (!isContentLoaded) {
    return (
      <LoadingComponent isContentLoaded={false} progress={progress} setProgress={setProgress} />
    );
  }

  return (
    <div className="page-shell">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-title">Explore blogs</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Fresh posts from the community
          </p>
        </div>
        <NavLink to="/add-post">
          <Button>Write a post</Button>
        </NavLink>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="card sticky top-24 overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                Categories
              </h2>
            </div>
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
              {category.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer border-b border-slate-50 px-4 py-3 transition hover:bg-orange-50 dark:border-zinc-800 dark:hover:bg-orange-500/5"
                >
                  <p className="font-medium text-slate-800 dark:text-zinc-100">{item.category}</p>
                  <p className="text-xs text-slate-400">{item.post} posts</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Feed */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <CiSearch size="1.4em" className="text-slate-400" />
            <input
              type="text"
              placeholder="Search posts, authors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <Container className="!px-0">
            {filtered.length === 0 ? (
              <div className="card py-16 text-center">
                <p className="text-slate-500">No posts found.</p>
                <NavLink to="/add-post" className="mt-4 inline-block">
                  <Button variant="outline">Create the first one</Button>
                </NavLink>
              </div>
            ) : (
              filtered.map((item) => <UserPost key={item._id || item.slug} {...item} />)
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}