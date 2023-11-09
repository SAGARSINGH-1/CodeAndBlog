import React, { useState } from 'react'
import Category from './Categorybtn'
import { latestBlog, popularblog, topBlog } from '../Data'


export default function Blogs() {
    const [top, setTop] = useState(topBlog);
    const [latest, setLatest] = useState(latestBlog);
    const [popular, setPopular] = useState(popularblog)
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

      <div className='bloglist w-[85vw] m-3 flex gap-3 p-3'>
                <div className=' w-[65vw]'>
                    <div className='bg-black text-white mb-5'>
                        <h2 className="font-Montserrat font-semibold p-3 ml-3">Latest Blog</h2>
                    </div>
                    <div>
                        {
                            latest.map((item) =>{
                                return(
                                    <div key={item.id} className='blog flex bg-slate-100 hover:bg-slate-200 hover:cursor-pointer mb-5 w-[57vw]'>
                                       <div className='img relative h-[25vh] w-[25vw]'>
                                            <img className='w-full h-full object-cover hover:scale-105 transition duration-300 ' src={item.img} alt="blog" />
                                            <div className="absolute inset-x-0 bottom-0 bg-opacity-50 text-white p-2">
                                                <Category val={item.category} />
                                            </div>
                                        </div>
                                        <div className='ml-3 p-3 w-[50vw]'>
                                            <h1 className="text-2xl font-bold">{item.title}</h1>
                                            <div className='text-base text-gray-400 flex gap-10 mt-3'>
                                                <p>{item.author}</p>
                                                <p>{item.date}</p>
                                            </div>
                                            <p className='text-lg text-gray-500 mt-1'>{item.desc}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w-[30vw]'>
                    <div className='bg-black text-white mb-5'>
                        <h2 className="font-Montserrat font-semibold p-3 ml-3">Popular Blog</h2>
                    </div>
                    <div>
                        {
                            popular.map((item)=>{
                                return(
                                    <div key={item.id} className='flex gap-3 p-3 mt-5 hover:bg-slate-100 hover:cursor-pointer'>
                                        <div>
                                            <h1 className='text-4xl text-gray-400 font-Montserrat mt-2' >Q{item.id}</h1>
                                        </div>
                                        <div>
                                        <h1 className="text-xl font-semibold">{item.title}</h1>
                                            <div className='text-base text-gray-400 flex gap-10 mt-3'>
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
    </div>
  )
}


