import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * Route guard used in main.jsx as <AuthLayout authentication>
 * - authentication={true}  → must be logged in (else /login)
 * - authentication={false} → public; if already logged in, send to /
 */
export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate('/login');
        } else if (!authentication && authStatus) {
            // optional: keep logged-in users off login/signup
            // only redirect for auth pages if desired — comment out if you want
            // navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    if (loader) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            </div>
        );
    }

    return <>{children}</>;
}