import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hreo = () => {
  return (
    <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] mt-8 rounded-2xl overflow-hidden shadow-lg">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={assets.head3}
        alt="Delicious food background"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Order your <br />
          <span className="text-white">favourite food here</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mb-6">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>

        <Link to="/collection">
          <button className="bg-red-500 hover:bg-red-600 px-6 py-2 sm:py-3 rounded-full font-medium w-fit text-sm sm:text-base">
            View Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hreo;
