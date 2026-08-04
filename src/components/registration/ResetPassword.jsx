import React, { useState } from 'react';
import Button from '../layout/Button';
import authService from '../../appwrite/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

/**
 * Routes expected:
 *  - /password-reset              → request reset email
 *  - /reset-password/:token       → set new password (from email link)
 *
 * Backend: POST /api/auth/forgot-password { email }
 *          POST /api/auth/reset-password/:token { password }
 * Email link format: `${CLIENT_URL}/reset-password/${resetToken}`
 */
function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Support both path param and query (legacy Appwrite used ?secret=&userId=)
  const { token: pathToken } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const token = pathToken || urlParams.get('secret') || urlParams.get('token');

  async function handleForgotSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await authService.PasswordRecovery(email);
      setMessage('If that account exists, a reset link has been sent.');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Request failed');
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password !== passwordAgain) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      // signature: ResetPassword(userId, secret, password, passwordAgain) — only secret & password used
      await authService.ResetPassword(null, token, password, passwordAgain);
      setMessage('Password reset successfully. Redirecting to login…');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Reset failed');
    }
  }

  return (
    <div className="flex justify-center gap-10 bg-gray-50 dark:bg-gray-900 h-[90vh] items-center">
      <div className="p-3 hidden md:block">
        <img className="h-[60vh]" src="/reset.svg" alt="illustration" loading="lazy" />
      </div>

      {token ? (
        <div className="h-auto w-full max-w-md flex flex-col justify-center p-6">
          <label className="text-xl font-bold my-2">Reset Password</label>
          <label className="text-md text-gray-500 font-semibold mb-3">
            Enter your new password.
          </label>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 dark:bg-gray-900 rounded-lg my-3 px-3 py-2 border border-gray-300 outline-none w-full"
            placeholder="New password"
            autoComplete="new-password"
          />
          <label className="text-lg font-semibold my-2">Confirm Password</label>
          <input
            type="password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            className="bg-gray-100 rounded-lg mb-5 px-3 py-2 border dark:bg-gray-900 border-gray-300 outline-none w-full"
            placeholder="Confirm password"
            autoComplete="new-password"
          />
          <Button onClick={handleResetPassword} type="button" className="w-full">
            Submit
          </Button>
        </div>
      ) : (
        <div className="p-3 w-full max-w-md">
          <form onSubmit={handleForgotSubmit} className="h-auto flex flex-col justify-center">
            <label className="text-xl font-bold my-2">Forgot Password</label>
            <label className="text-md text-gray-500 font-semibold">
              Enter your email and we&apos;ll send you a link to reset your password.
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 rounded-lg mt-5 mb-3 px-3 py-2 border dark:bg-gray-900 border-gray-300 outline-none w-full"
              autoComplete="email"
              placeholder="Email..."
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
            <Link to="/login">
              <div className="flex font-semibold text-slate-500 justify-center mt-10 w-full cursor-pointer hover:underline">
                <span className="my-auto mx-1 mt-1">
                  <IoIosArrowBack size="1.1em" />
                </span>{' '}
                Back to Login
              </div>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;