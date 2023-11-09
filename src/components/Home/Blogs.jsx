import React, { useState } from 'react'
import Category from './Categorybtn'
import { latestBlog, topBlog } from '../Data'


export default function Blogs() {
    const [top, setTop] = useState(topBlog);
    const [latest, setLatest] = useState(latestBlog);
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
                        <p>JK Nayar</p>
                        <p>11 Mar 20</p>
                    </div>
                </div>
            </div>
        
            <div className='h-[65vh] w-[35vw]'> 
                {
                    top.map((item) =>{
                        return(
                            <div key={item.id} className='relative m-3 mb-5 h-[31vh] w-[30vw] '>
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

      <div className='bloglist border-2 border-black h-[80vh] w-[80vw] m-3 flex'>
                <div className='border-2 border-red-400 h-[50vh] w-[50vw]'>
                    <div>
                        <h2>Latest Blog</h2>
                    </div>
                    <div>
                        {
                            latest.map((item) =>{
                                return(
                                    <div key={item.id} className='blog flex'>
                                        <div className='img h-[20vh] w-[20vw]'>
                                            <img className='w-full h-full object-cover hover:scale-105 transition duration-300 ' src={item.img} alt="blog" />
                                        </div>
                                        <div className='desc border-2 border-indigo-400'>
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
                <div className='border-2 border-red-400 h-[30vh] w-[30vw]'>
                    <div>
                        <h2>Popular Blogs</h2>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
    </div>
  )
}


