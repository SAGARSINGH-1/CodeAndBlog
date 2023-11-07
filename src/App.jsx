import { useState } from 'react'
import conf from './conf/conf';

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <div className='mx-[100vh] my-[50vh] text-4xl font-bold text-yellow-500'>Hello</div>
  )
}

export default App
