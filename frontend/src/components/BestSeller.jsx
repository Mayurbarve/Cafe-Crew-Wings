import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/ShopContext';
import { FaStar, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BestSeller = () => {
  const { food_list, addToCart } = useContext(StoreContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (food_list && food_list.length > 0) {
      const bestProduct = food_list.filter(item => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5)); // show top 5 bestsellers
    }
  }, [food_list]);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Cafe <span className="relative inline-block">
            Favourites
            <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
          </span>
        </h2>
        <p className="w-3/4 mx-auto mt-2 text-sm text-gray-600">
          Savour our most-loved brews and bites — perfected by passion, enjoyed by thousands.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md text-center transition-transform hover:-translate-y-1 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 mx-auto object-cover rounded-full mb-4"
            />
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>4.5</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegHeart />
                <span>1.5k</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-3">
              We will deliver your food within 30 minutes in your town, if we would.
            </p>
            <div className="flex justify-between items-center font-bold">
              <span className="text-xl">${item.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(item._id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/collection">
        <button className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-2 rounded-full text-sm">
          See All Dishes →
        </button>
       </Link>
      </div>
    </div>
  );
};

export default BestSeller;
