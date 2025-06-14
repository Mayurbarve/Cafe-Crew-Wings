import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hreo = () => {
  const images = [assets.head1, assets.head2, assets.head3, assets.head4, assets.head5];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Manual navigation
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] mt-8 rounded-3xl overflow-hidden shadow-lg">
      <img
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        src={images[currentIndex]}
        alt="Delicious food background"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 text-white z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Order your <br />
          <span className="text-white">favourite food here</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mb-6">
          Explore a diverse menu of delicious dishes made with the finest ingredients to satisfy your cravings and elevate your dining experience.
        </p>

        <Link to="/collection">
          <button className="bg-red-500 hover:bg-red-600 px-6 py-2 sm:py-3 rounded-full font-medium w-fit text-sm sm:text-base">
            View Menu
          </button>
        </Link>
      </div>

      {/* Manual Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full z-20 hover:bg-black/60"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full z-20 hover:bg-black/60"
      >
        ▶
      </button>
      
    </div>
    
  );
};

export default Hreo;
