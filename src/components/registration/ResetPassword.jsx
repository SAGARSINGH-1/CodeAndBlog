import React, { useEffect, useState } from 'react';
import Button from '../layout/Button';
import authService from '../../appwrite/auth';
import { Link, Navigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    function handleInputChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        // console.log(e.target.value);
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e) {
        // console.log(e.target.value);
        setPasswordAgain(e.target.value);
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
        authService.ResetPassword(secret, userId, password, passwordAgain).then((res) => {
            if (res) {
                Navigate('/login');
            }
        })
    }

    return (
        <>
            <div className='flex justify-center gap-10 bg-gray-50 dark:bg-gray-900 h-[90vh] items-center'>
                <div className='p-3'>
                    <img className='h-[60vh]' src="./reset.svg" alt="illustration" loading="lazy"/>
                </div>
                {secret && userId ?
                    <div className='h-[50vh] w-[25vw] flex flex-col justify-center'>
                        <label className='text-xl font-bold my-2'>Reset Password</label>
                        <label className='text-md text-gray-500 font-semibold'>Enter your new password.</label>
                        <input
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            className='bg-gray-100 dark:bg-gray-900 rounded-lg my-3 px-3 py-2 border border-gray-300 outline-none w-[90%]'
                            placeholder='Password'
                        />
                        
                        <label className='text-lg font-semibold my-2'>Confirm Password</label>
                        <input
                            type='password'
                            value={passwordAgain}
                            onChange={handleConfirmPassword}
                            className='bg-gray-100 rounded-lg mb-5 px-3 py-2 border dark:bg-gray-900 border-gray-300 outline-none w-[90%]'
                            placeholder='Confirm Password'
                        />

                        <Button onClick={handleResetPassword} type='submit' className='w-[90%]'>
                            Submit
                        </Button>
                    </div>
                    :
                    <div className='p-3'>
                        <form onSubmit={handleSubmit} className='h-[50vh] flex flex-col justify-center'>
                            <label className='text-xl font-bold my-2'>Forgot Password</label>
                            <label className='text-md text-gray-500 font-semibold'>Enter your email and we'll send you a link to reset your password.</label>
                            <input
                                type='email'
                                value={email}
                                onChange={handleInputChange}
                                className='bg-gray-100 rounded-lg mt-5 mb-3 px-3 py-2 border dark:bg-gray-900 border-gray-300 outline-none w-[90%]'
                                autoComplete='on'
                                placeholder='Email...'
                            />

                            <Button type='submit' className='w-[90%]'>
                                Submit
                            </Button>

                            <Link to='/login'><div className='flex font-semibold text-slate-500 justify-center mt-10 w-[90%] cursor-pointer hover:underline'><span className='my-auto mx-1 mt-1'><IoIosArrowBack size="1.1em" /></span> Back to Login </div></Link>
                        </form>
                    </div>
                }
            </div>
        </>
    );
}

export default ResetPassword;
