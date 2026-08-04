import React, { useEffect, useState } from 'react';
import authService from '../../appwrite/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import LoadingComponent from '../layout/Loader';
import Button from '../layout/Button';

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const create = async (data) => {
    setError('');
    try {
      const user = await authService.createAccount(data);
      if (user) {
        dispatch(login(user));
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Signup failed');
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setContentLoaded(true), 300);
    const i = setInterval(() => setProgress((p) => Math.min(p + 25, 100)), 100);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  if (!isContentLoaded) {
    return (
      <LoadingComponent isContentLoaded={false} progress={progress} setProgress={setProgress} />
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8 shadow-soft">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Join CodeAndBlog and start publishing
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Full name
            </label>
            <input
              type="text"
              id="name"
              className="input-field"
              placeholder="Jane Doe"
              autoComplete="name"
              {...register('name', { required: true })}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Min 8 characters"
              autoComplete="new-password"
              {...register('password', { required: true, minLength: 8 })}
            />
          </div>
          <Button type="submit" className="w-full py-3">
            Sign up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-400">
          Already have an account?{' '}
          <NavLink className="font-semibold text-orange-500 hover:text-orange-600" to="/login">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
}