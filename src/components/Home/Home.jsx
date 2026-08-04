import React, { useEffect, useState } from 'react';
import Button from '../layout/Button';
import LoadingComponent from '../layout/Loader';
import { NavLink } from 'react-router-dom';
import Carousels from './Carousel';

export default function Home() {
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => setContentLoaded(true), 500);
    const intervalId = setInterval(() => {
      setProgress((p) => Math.min(p + Math.floor(Math.random() * 35) + 5, 100));
    }, 120);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  if (!isContentLoaded) {
    return (
      <LoadingComponent
        isContentLoaded={false}
        progress={progress}
        setProgress={setProgress}
      />
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-zinc-800">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent dark:from-orange-500/10" />
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-16 text-center md:px-6 md:pb-24 md:pt-20">
          <div className="mb-6 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
            Write · Share · Learn
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            Discover, learn, and{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              inspire
            </span>{' '}
            today
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-zinc-400 md:text-lg">
            Dive into stories and wisdom — every scroll opens a new chapter of inspiration for
            developers and creators.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <NavLink to="/blogs">
              <Button className="px-6 py-3 text-base">Explore blogs</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button variant="outline" className="px-6 py-3 text-base">
                Join free
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="page-shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Our journey, your destination</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            Welcome to{' '}
            <span className="font-semibold text-orange-500">CodeAndBlog</span> — a passionate
            community sharing insights, stories, and knowledge across tech and beyond.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 shadow-soft dark:border-zinc-800">
          <Carousels />
        </div>
      </section>

      {/* Membership teaser */}
      <section className="page-shell pt-4">
        <div className="card overflow-hidden lg:flex">
          <div className="flex-1 p-8 sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight">Lifetime membership</h3>
            <p className="mt-4 text-slate-600 dark:text-zinc-400">
              Embrace lifelong learning with continuous growth and exploration.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-semibold text-orange-500">What&apos;s included</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-700" />
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-zinc-300 sm:grid-cols-2">
              {[
                'Private forum access',
                'Member resources',
                'Entry to annual conference',
                'Official member t-shirt',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white sm:p-10 lg:w-80">
            <p className="text-sm font-medium text-orange-100">Special offer</p>
            <p className="text-4xl font-bold tracking-tight">
              $99 <span className="text-lg font-normal text-orange-100">/ forever</span>
            </p>
            <NavLink to="/signup">
              <Button
                variant="secondary"
                className="w-full bg-white text-orange-600 hover:bg-orange-50 dark:bg-white dark:text-orange-600"
              >
                Get access
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-shell pb-20">
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white dark:bg-zinc-900 md:px-12">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to publish your first post?</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-300">
            Create an account and share your knowledge with the community in minutes.
          </p>
          <NavLink to="/add-post" className="mt-8 inline-block">
            <Button className="px-8 py-3 text-base">Start writing</Button>
          </NavLink>
        </div>
      </section>
    </div>
  );
}