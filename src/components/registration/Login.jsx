import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../store/authSlice'
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { useForm } from "react-hook-form"
import LoadingBar from 'react-top-loading-bar'
import { FcGoogle } from 'react-icons/fc';
import LoadingComponent from '../layout/Loader';


export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm()

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }


  // top Loader
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const randomIncrement = Math.floor(Math.random() * 50) + 1;
        const newProgress = Math.min(prevProgress + randomIncrement, 100);
        return newProgress;
      });
    }, 300);

    // Clean up the timeout and interval when the component unmounts
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  function PasswordReset() {
    navigate("/password-reset")
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 m-5 p-5">
      {isContentLoaded ? (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                placeholder="Email"
                required
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
                })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                placeholder="Password"
                required
                autoComplete='on'
                {...register("password", {
                  required: true,
                })}
              />
              <p className=" text-gray-600 text-sm font-semibold m-3 text-end">
                Forget <Link className="text-indigo-500 cursor-pointer" to={'/password-reset'}>password?</Link>
              </p>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </div>

            <div className="social-login-label relative mt-4 text-center">
              <span className="label-text relative z-10 inline-block px-2 bg-white text-gray-500 font-semibold">
                or connect with
              </span>
              <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300 mt-0.5"></div>
            </div>

            <NavLink>
              <button className="rounded-full w-full bg-white border border-gray-300 flex items-center justify-center p-3 shadow-sm hover:shadow-md my-3 font-semibold">
                <span className="mr-2"><FcGoogle size="1.5em" /></span>
                Continue with Google
              </button>
            </NavLink>
          </form>
          
          <p className="text-center text-gray-600 text-sm">
            Don't have an account? <NavLink className="text-indigo-500" to='/signup'>Signup</NavLink>
          </p>
        </div>
      ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}

      
    </div>
  );
}

