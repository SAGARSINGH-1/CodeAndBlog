import React, { useEffect, useState } from 'react';
import Button from '../layout/Button';
import authService from '../../appwrite/auth';
import { Navigate } from 'react-router-dom';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleInputChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        // console.log(e.target.value);
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await authService.PasswordRecovery(email);
        // After submitting the forget password request, consider providing feedback to the user
    }

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    function handleResetPassword(e) {
        e.preventDefault();
        authService.ResetPassword(secret, userId, password).then((res) => {
            if (res) {
                Navigate('/login');
            }
        })
    }

    return (
        <>
            {secret && userId ?
                <>
                    <input
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        className='border-2 border-black rounded-lg my-3 px-3'
                    />
                    <label className='text-md'>Enter Password:</label>
                    <Button onClick={handleResetPassword} type='submit' className=''>
                        Submit
                    </Button>
                </>
                :
                <form onSubmit={handleSubmit} className='h-[50vh] flex flex-col justify-center items-center'>
                    <label className='text-md'>Enter Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={handleInputChange}
                        className='border-2 border-black rounded-lg my-3 px-3'
                        autoComplete='on'
                    />

                    <Button type='submit' className=''>
                        Submit
                    </Button>
                </form>}
        </>
    );
}

export default ResetPassword;
