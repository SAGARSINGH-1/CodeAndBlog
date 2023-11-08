import { useState } from 'react'
import conf from './conf/conf';
import Layout from './components/layout/Layout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Home/Home';
import SignupForm from './registration/Signup';
import LoginForm from './registration/Login';


function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='' element={<Layout />}>
        <Route path='' element={<Home />}/>
       
        <Route path='login' element={<LoginForm />}/>
        <Route path='signup' element={<SignupForm />}/>
      </Route>
    )
  )

  return (
    <div className="flex justify-center overflow-hidden">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
