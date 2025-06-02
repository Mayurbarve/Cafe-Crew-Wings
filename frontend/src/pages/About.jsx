import React from 'react';
import { assets } from '../assets/assets';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto border-t">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Chef + Burger + Badge */}
        <div className="relative flex justify-center">
          {/* Background Shapes (you can customize with Tailwind or use absolute SVGs/images if needed) */}
          <div className="absolute w-60 h-80 bg-red-500 hover:bg-red-600  rounded-[60px] -z-10 top-0 left-5" />
          <div className="absolute w-48 h-56 bg-orange-400 rounded-[50px] -z-10 top-20 right-5" />

          {/* Main Image */}
          <img
            src={assets.head2}
            alt="Chef"
            className="relative z-10 max-w-[300px] md:max-w-[350px] rounded-full mt-5"
          />

          {/* Burger Image Overlay (adjust src as needed)
          <img
            src={assets.burger_img}
            alt="Burger"
            className="absolute top-10 right-8 w-24 z-20"
          /> */}
        </div>

        {/* Right Side: Text Content */}
        <div className="text-left">
          <h2 className="text-2xl font-bold">
          About <span className="relative inline-block">
            Us
            <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
          </span>
        </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-4 leading-snug">
            The best way to find yourself is to lose in the service of others.
          </h2>
          <ul className="space-y-3 text-gray-600">
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

          <button className="mt-6  text-white px-6 py-2 rounded-full font-medium bg-red-500 hover:bg-red-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
