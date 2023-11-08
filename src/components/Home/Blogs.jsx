import React, { useState } from 'react'
import Category from './Categorybtn'
import { latestBlog } from '../Data'


export default function Blogs() {
    const [latest, setLatest] = useState(latestBlog)
  return (
    <div className='max-w-6xl mx-auto'>
        {/* Top section */}
      <div className='m-3 flex mt-10'>
            <div className='relative m-3 h-[65vh] w-[50vw] '>
                <img className='w-full h-full object-cover hover:scale-105 transition duration-300' src="./Blogs/Politics.jpg" alt="politics"/>

                <div className="absolute bottom-3 left-0 text-white p-4">
                    <Category val="Politics" />
                    <h1 className="text-4xl font-semibold">The Great Politicians</h1>
                    <div className='flex gap-10 ml-5 mt-3'>
                        <p>Author</p>
                        <p>Date</p>
                    </div>
                </div>
            </div>
        
            <div className='h-[65vh] w-[35vw]'> 
                {
                    latest.map((item) =>{
                        return(
                            <div className='relative m-3 mb-5 h-[31vh] w-[30vw] '>
                                <img className='w-full h-full object-cover hover:scale-105 transition duration-300 ' src={item.icon} alt="politics"/>

                                <div className="absolute bottom-0 left-0 text-white p-4">
                                    <Category val="Politics" />
                                    <h1 className="text-xl font-semibold">{item.title}</h1>
                                    <div className='flex gap-10 ml-5 mt-3'>
                                        <p>{item.author}</p>
                                        <p>{item.date}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
      </div>
    </div>
  )
}


