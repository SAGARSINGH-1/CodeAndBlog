import React, { useEffect, useState } from "react";
import { features } from "../Data";
import Carousels from "./Carousel";
import Blogs from "./Blogs";
import LoadingBar from 'react-top-loading-bar'
import LoadingComponent from "../layout/Loader";

export default function Home() {
  const [feature, setFeature] = useState(features);

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
  }, 200);

  // Clean up the timeout and interval when the component unmounts
  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
}, []);

  return (
    <div>
      {isContentLoaded ? (
      <div className="overflow-x-hidden overflow-y-hidden">
        <div className="hero h-[100vh]">
          <img className="w-full h-auto" src="./people-2.jpg" alt="people" />
          <div className="absolute top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h2 className="text-2xl sm:text-5xl font-semibold mb-2 font-Fira uppercase">
              Welcome To
            </h2>
            <h1 className="text-4xl sm:text-7xl font-bold mb-7 font-Fira">
              Code And Blog
            </h1>
            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-lg hover:bg-orange-600 transition duration-300">
              Get Started
            </button>
          </div>
          <div className="featurecard flex justify-center m-3 absolute top-[40rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {feature.map((item) => {
              return (
                <div
                  key={item.id}
                  className="border-2 m-5 p-5 py-10 w-[20vw] rounded-2xl bg-slate-300 flex flex-col justify-center items-center hover:scale-105 transform transition-transform duration-300 text-center"
                >
                  <div className="bg-white w-[5vw] h-[8vh] rounded-full p-1">
                    {item.icon}
                  </div>
                  <div className="mt-5">
                    <h1 className="text-xl font-semibold m-3">{item.title}</h1>
                    <p className="text-base m-3 my-5 text-gray-500">
                      {item.discription}
                    </p>
                  </div>
                  <button className="ml-3 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-lg hover:bg-orange-600 transition duration-300">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:mt-15">
          <section>
            <div className="flex justify-center gap-40 text-center p-10 mt-10 mb-10 font-semibold text-xl bg-orange-400 text-white">
              <div className="div-1">
                <h1>100+</h1>
                <h3>Daily Signup</h3>
              </div>
              <div className="div-2">
                <h1>1K+</h1>
                <h3>Active members</h3>
              </div>
              <div className="div-3">
                <h1>100</h1>
                <h3>Daily Posts</h3>
              </div>
              <div className="div-4">
                <h1>2.3</h1>
                <h3>Rating</h3>
              </div>
            </div>
          </section>
        </div>

        <div className="w-[70vw] h-[58vh] mx-auto shadow-lg my-5">
          <Carousels />
        </div>

        <div>
          <Blogs />
        </div>
      </div>
       ) : (<LoadingComponent isContentLoaded={isContentLoaded} progress={progress} setProgress={setProgress} />)}

    </div>
  );
}
