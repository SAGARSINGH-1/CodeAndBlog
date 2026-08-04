import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/registration/Login.jsx';
import Signup from './components/registration/Signup.jsx';
import UserBlog from './components/pages/Blogs.jsx';
import Error from './components/pages/Error.jsx';
import AuthLayout from './AuthLayout.jsx';
import AddPost from './components/pages/AddPost.jsx';
import EditPost from './components/pages/EditPost.jsx';
import Post from './components/pages/Post.jsx';
import MyBlogs from './components/pages/MyBlogs.jsx';
import Profile from './components/pages/userProfile.jsx';
import Setting from './components/pages/Setting.jsx';
import ResetPassword from './components/registration/ResetPassword.jsx';
import VerifyEmail from './components/pages/VerifyEmail.jsx';
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
import Help from './components/pages/Help.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: 'add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: 'edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: 'post/:slug',
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: 'blogs',
        element: (
          <AuthLayout authentication>
            <UserBlog />
          </AuthLayout>
        ),
      },
      {
        path: 'my-blogs',
        element: (
          <AuthLayout authentication>
            <MyBlogs />
          </AuthLayout>
        ),
      },
      {
        path: 'user/:username',
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: 'setting',
        element: (
          <AuthLayout authentication>
            <Setting />
          </AuthLayout>
        ),
      },
      {
        path: 'password-reset',
        element: <ResetPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
      {
        path: 'verify-email/:token',
        element: <VerifyEmail />,
      },
      {
        path: 'about',
        element: (
          <AuthLayout authentication={false}>
            <About />
          </AuthLayout>
        ),
      },
      {
        path: 'contact',
        element: (
          <AuthLayout authentication={false}>
            <Contact />
          </AuthLayout>
        ),
      },
      {
        path: 'help',
        element: (
          <AuthLayout authentication={false}>
            <Help />
          </AuthLayout>
        ),
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);