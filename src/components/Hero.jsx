import React from 'react'
import { assets } from "../../public/assets/frontend_assets/assets";
<<<<<<< HEAD
=======

import HeroCollection from './HeroCollection'  // or './Collection'
>>>>>>> 83b28a122e6991040aa412dd99885b36616d6165
function Hero() {
    return (

<div className="flex flex-col sm:flex-row justify-center items-center border-2 border-gray-100 h-auto sm:h-[33.5vw] p-6 sm:p-10 gap-y-10">
  {/* Left Side */}
  <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-1/2 text-center sm:text-left">
    {/* Bestseller Line */}
    <div className="flex items-center gap-2 text-[#414141]">
      <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
      <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
    </div>

    {/* Title */}
<<<<<<< HEAD
    <h2 className="prata-regular text-4xl sm:text-5xl md:text-6xl text-[#414141] leading-tight">
=======
    <h2 SclassName="prata-regular text-4xl sm:text-5xl md:text-6xl text-[#414141] leading-tight">
>>>>>>> 83b28a122e6991040aa412dd99885b36616d6165
      Latest Arrivals
    </h2>

    {/* Shop Now Line */}
    <div className="flex items-center gap-2 text-[#414141] mt-3 sm:mt-5">
      <p className="font-medium text-sm md:text-base cursor-pointer hover:underline">
        SHOP NOW
      </p>
      <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
    </div>
<<<<<<< HEAD
=======
    
>>>>>>> 83b28a122e6991040aa412dd99885b36616d6165
  </div>

  {/* Right Side */}
  <div className="w-full sm:w-1/2 flex justify-center overflow-hidden">
    <img className="w-full h-auto max-h-[400px] object-cover rounded-lg" src={assets.hero_img} alt="Latest Arrivals" />
  </div>
<<<<<<< HEAD
</div>

=======
  
</div>


>>>>>>> 83b28a122e6991040aa412dd99885b36616d6165
    )
}

export default Hero