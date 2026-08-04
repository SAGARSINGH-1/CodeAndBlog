import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import authService from '../../appwrite/auth';
import Button from '../layout/Button';

/**
 * Handles email verification links from the backend:
 *   ${CLIENT_URL}/verify-email/${token}
 *
 * Also tolerates legacy query form: ?secret=...
 */
export default function VerifyEmail() {
  const { token: pathToken } = useParams();
  const [searchParams] = useSearchParams();
  const token = pathToken || searchParams.get('secret') || searchParams.get('token');

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token.');
      return;
    }
    setStatus('loading');
    authService
      .updateVerification(null, token)
      .then(() => {
        setStatus('success');
        setMessage('Email verified successfully. You can close this page.');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(
          err?.response?.data?.message || err.message || 'Verification link is invalid or expired.'
        );
      });
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Email verification</h1>
        {status === 'loading' && (
          <p className="text-gray-500">Verifying your email…</p>
        )}
        {status === 'success' && (
          <>
            <p className="text-green-600 mb-6">{message}</p>
            <Link to="/">
              <Button>Go home</Button>
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-500 mb-6">{message}</p>
            <Link to="/setting">
              <Button>Back to settings</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}