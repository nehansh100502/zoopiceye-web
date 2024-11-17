import React from 'react';
import { FaHeadset } from 'react-icons/fa';

function bookslote() {
  return (
    <div className="text-center px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Coming Soon Text */}
      <div className="mt-20 md:mt-40 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] text-center mb-6 sm:mb-8 lg:mb-11 font-serif">
        Coming Soon
      </div>

      {/* Headset Icon and Heading */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
        <FaHeadset className="text-orange-500 text-4xl sm:text-5xl" />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#129eb3] text-center md:text-left">
          Protect Your Eyes During Screen Time
        </h2>
      </div>

      {/* Description Text */}
      <p className="mt-2 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
        In today’s digital age, we spend hours staring at screens, which can take a toll on our eyes. 
        Learn essential eye care tips to keep your vision healthy...
      </p>
    </div>
  );
}

export default bookslote;
