import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { useForm } from 'react-hook-form';
import LoadingComponent from '../layout/Loader';
import Button from '../layout/Button';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const login = async (data) => {
    setError('');
    try {
      const user = await authService.login(data);
      if (user) {
        dispatch(authLogin(user));
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
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
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Log in to continue writing and reading
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-4">
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
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password', { required: true })}
            />
            <p className="mt-2 text-right text-sm">
              <NavLink className="font-medium text-orange-500 hover:text-orange-600" to="/password-reset">
                Forgot password?
              </NavLink>
            </p>
          </div>
          <Button type="submit" className="w-full py-3">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <NavLink className="font-semibold text-orange-500 hover:text-orange-600" to="/signup">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}