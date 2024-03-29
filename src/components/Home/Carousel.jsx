import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Carousels() {

  return (
    <div>
        <Carousel 
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        >
       
            <div className=" md:flex bg-gray-50 dark:bg-black p-10 max-h-max max-w-max md:h-[70vh] md:w-[70vw] dark:border-2 dark:border-white">
                <div className="img md:w-[150vw] md:h-[30vw] my-auto">
                    <img src="./Exersise.jpg" className="w-full h-[85%] object-cover rounded-lg" alt="Exercise" loading="lazy"/>
                </div>
                <div className="p-4 border-spacing-2 border-black text-left">
                    <h2 className="text-lg font-semibold m-2 text-gray-400">Sports and Life</h2>
                    <h1 className="text-2xl font-bold mb-5">Sports and Life: Lessons Beyond the Game</h1>
                    <p className="text-sm text-gray-600 dark:text-white font-Rosarivo">
                        Sports and life are intertwined in countless ways. Beyond physical health, sports teach teamwork, discipline, and resilience.
                        They mirror life's challenges, victories, and the pursuit of excellence, offering valuable life lessons through the arena of competition.
                    </p>
                    <p className=" text-gray-600 mt-10">
                        <span className="text-lg font-semibold text-orange-500 italic">James Rick</span> in Sports
                        <span className="text-gray-600 block">Jun 13</span>
                    </p>
                </div>
            </div>

            <div className="md:flex bg-gray-50 dark:bg-black md:h-[65vh] md:w-[70vw]  p-4 max-h-max max-w-max dark:border-2 dark:border-white">
                <div className="img md:w-[150vw] md:h-[30vw] my-auto">
                    <img src="./Health.jpg" className="w-full h-[85%] object-cover rounded-lg" alt="Exercise" loading="lazy"/>
                </div>
                <div className="p-4 border-spacing-2 border-black text-left">
                    <h2 className="text-lg font-semibold m-2 text-gray-400">Healthy Life and Food</h2>
                    <h1 className="text-2xl font-bold mb-5">Health: Nutrition for Vibrant Living</h1>
                    <p className="text-sm text-gray-600 font-Rosarivo dark:text-white">
                    In the pursuit of a healthy life, the role of nutrition is paramount. A diet rich in whole foods, balanced with exercise, and a positive mindset, 
                    can transform your life. Discover the power of mindful eating and its impact on overall well-being.
                    </p>
                    <p className=" text-gray-600 mt-10">
                        <span className="text-lg font-semibold text-orange-500 italic">Lemu Vin</span> in Fitness
                        <span className="text-gray-600 block">Aug 15</span>
                    </p>
                </div>
            </div>

            <div className="md:flex bg-gray-50 dark:bg-black p-4 max-h-max max-w-max md:h-[65vh] md:w-[70vw] dark:border-2 dark:border-white">
                <div className="img md:w-[150vw] md:h-[30vw] my-auto">
                    <img src="./Tech-2.jpg" className="w-full h-[85%] object-cover rounded-lg" alt="Exercise" loading="lazy"/>
                </div>
                <div className="p-4 border-spacing-2 border-black text-left">
                    <h2 className="text-lg font-semibold m-2 text-gray-400">Technology</h2>
                    <h1 className="text-2xl font-bold mb-5">Technology and AI: Shaping Tomorrow</h1>
                    <p className="text-sm text-gray-600 font-Rosarivo dark:text-white">
                    In the realm of technology, artificial intelligence stands as a beacon of innovation. Its far-reaching influence touches every facet of our lives, 
                    from automation and data analysis to healthcare and self-driving cars. Discover how AI is revolutionizing the future
                    </p>
                    <p className=" text-gray-600 mt-10">
                        <span className="text-lg font-semibold text-orange-500 italic">David Grahm</span> in AI
                        <span className="text-gray-600 block">Jun 9</span>
                    </p>
                </div>
            </div>
        </Carousel>
    </div>
    
  );
}