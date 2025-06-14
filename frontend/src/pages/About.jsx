import React from 'react';
import { assets } from '../assets/assets';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
        
        {/* Left Side: Images */}
        <div className="relative flex justify-center min-h-[300px] sm:min-h-[400px] md:min-h-0">
          {/* Background Shapes */}
          <div className="absolute w-40 h-60 sm:w-52 sm:h-72 bg-red-500 hover:bg-red-600 rounded-[60px] top-0 left-4 sm:left-6 lg:left-10 transition-colors duration-300" />
          <div className="absolute w-32 h-48 sm:w-44 sm:h-60 bg-orange-400 rounded-[50px] top-24 right-4 sm:right-6 lg:right-10" />

          {/* Chef Image */}
          <img
            src={assets.head3}
            alt="Chef"
            className="relative z-10 w-56 h-48 sm:w-72 md:w-60 lg:w-[350px] rounded-full mt-6"
          />
        </div>

        {/* Right Side: Content */}
        <div className="text-left z-10 bg-white/90 p-4 sm:p-0 rounded-md">
          <h2 className="text-2xl font-bold">
            About{' '}
            <span className="relative inline-block">
              Us
              <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
            </span>
          </h2>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6 leading-snug">
            The best way to find yourself is to lose in the service of others.
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-red-500 mt-1" />
              Our food satisfies your stomach and fresh feeling.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-red-500 mt-1" />
              You will find happiness and food here.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-red-500 mt-1" />
              Love and food—it is all about spice.
            </li>
          </ul>

          <button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
