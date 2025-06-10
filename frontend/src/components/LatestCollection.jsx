import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/ShopContext';
import { FaStar } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FreshMenu = () => {
  const { food_list, addToCart } = useContext(StoreContext);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (food_list && food_list.length > 0) {
      setDishes(food_list.slice(0, 8)); // show first 4 dishes
    }
  }, [food_list]);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Our <span className="relative inline-block">
            Fresh Menu
            <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="relative">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-40 object-cover rounded-xl"
              />
              <button
                onClick={() => addToCart(dish._id)}
                className="absolute bottom-2 right-2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
              >
                <FiPlus />
              </button>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-lg capitalize">{dish.name}</h3>
              <p className="text-sm text-gray-500">{dish.description || dish.category}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-red-500 font-semibold text-lg">₹{dish.price}</span>
                <div className="flex items-center gap-1 text-orange-400 text-sm">
                  {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                </div>
              </div>
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
      <hr className="mt-10 border-gray-200" />
    </div>
  );
};

export default FreshMenu;
