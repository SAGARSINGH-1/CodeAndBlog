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
        >
       
            <div className="flex border-2 bg-slate-100 rounded-lg p-4 shadow-md h-[58vh] w-[70vw]">
                <div className="img w-[150rem] h-[25rem]">
                    <img src="./Exersise.jpg" className="w-full h-full object-cover rounded-lg" alt="Exercise" />
                </div>
                <div className="p-4 border-spacing-2 border-black text-left">
                    <h2 className="text-xl font-semibold m-2 text-gray-400">Sports and Life</h2>
                    <h1 className="text-3xl font-bold mb-5">Sports and Life: Lessons Beyond the Game</h1>
                    <p className="text-base text-gray-600 font-Rosarivo">
                        Sports and life are intertwined in countless ways. Beyond physical health, sports teach teamwork, discipline, and resilience.
                        They mirror life's challenges, victories, and the pursuit of excellence, offering valuable life lessons through the arena of competition.
                    </p>
                    <p class=" text-gray-600 mt-10">
                        <span class="text-lg font-semibold text-orange-500 italic">James Rick</span> in Sports
                        <p className="text-gray-600">Jun 13</p>
                    </p>
                </div>
            </div>

            <div className="flex border-2  bg-slate-100 rounded-lg p-4 shadow-md h-[58vh] w-[70vw]">
                <div className="img w-[150rem] h-[25rem]">
                    <img src="./Health.jpg" className="w-full h-full object-cover rounded-lg" alt="Exercise" />
                </div>
                <div className="p-4 border-spacing-2 border-black text-left">
                    <h2 className="text-xl font-semibold m-2 text-gray-400">Healthy Life and Food</h2>
                    <h1 className="text-3xl font-bold mb-5">Health: Nutrition for Vibrant Living</h1>
                    <p className="text-base text-gray-600 font-Rosarivo">
                    In the pursuit of a healthy life, the role of nutrition is paramount. A diet rich in whole foods, balanced with exercise, and a positive mindset, 
                    can transform your life. Discover the power of mindful eating and its impact on overall well-being.
                    </p>
                    <p class=" text-gray-600 mt-10">
                        <span class="text-lg font-semibold text-orange-500 italic">Lemu Vin</span> in Fitness
                        <p className="text-gray-600">Aug 15</p>
                    </p>
                </div>
            </div>

            <div className="flex border-2  bg-slate-100 rounded-lg p-4 shadow-md h-[58vh] w-[70vw]">
                <div className="img w-[150rem] h-[25rem]">
                    <img src="./Tech-2.jpg" className="w-full h-full object-cover rounded-lg" alt="Exercise" />
                </div>
                <div className="p-4 border-spacing-2 border-black text-left">
                    <h2 className="text-xl font-semibold m-2 text-gray-400">Technology</h2>
                    <h1 className="text-3xl font-bold mb-5">Technology and AI: Shaping Tomorrow</h1>
                    <p className="text-base text-gray-600 font-Rosarivo">
                    In the realm of technology, artificial intelligence stands as a beacon of innovation. Its far-reaching influence touches every facet of our lives, 
                    from automation and data analysis to healthcare and self-driving cars. Discover how AI is revolutionizing the future
                    </p>
                    <p class=" text-gray-600 mt-10">
                        <span class="text-lg font-semibold text-orange-500 italic">David Grahm</span> in AI
                        <p className="text-gray-600">Jun 13</p>
                    </p>
                </div>
            </div>
        </Carousel>
    </div>
    
  );
}