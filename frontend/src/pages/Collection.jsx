

import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/ShopContext';

// Images
import dessert from '../assets/dessert.jpg';
import sandwitch from '../assets/sandwitch.jpg';
import beverage from '../assets/beverage.jpg';
import burger from '../assets/burger.jpg';
import fries from '../assets/fries.jpg';
import maggi from '../assets/maggi.jpg';
import momos from '../assets/momos.jpg';
import pizza from '../assets/pizza.jpg';

const menuItems = [
  { name: 'Dessert', image: dessert },
  { name: 'Sandwich', image: sandwitch },
  { name: 'Beverage', image: beverage },
  { name: 'Burger', image: burger },
  { name: 'Fries', image: fries },
  { name: 'Maggie', image: maggi },
  { name: 'Momos', image: momos },
  { name: 'Pizza', image: pizza }
];

const Collection = () => {
  const { food_list, addToCart } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(food_list);
    } else {
      const filtered = food_list.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory, food_list]);

  return (
    <div className="pt-10 border-t">
      {/* MenuExplore Section */}
      <section className="py-10 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Our <span className="relative inline-block">
            Fresh Menu
            <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
          </span>
        </h2>
        <p className="text-gray-600 mb-8 mt-4">
          Choose from a diverse menu featuring a delectable array of dishes.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {/* 'All' button */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedCategory('All')}
          >
            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${selectedCategory === 'All' ? 'border-red-500' : 'border-transparent'} transition-all duration-300`}>
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-800 font-bold">
                All
              </div>
            </div>
            <span className="mt-3 text-gray-700 text-sm font-medium">All</span>
          </div>

          {/* Menu items */}
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedCategory(item.name)}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${selectedCategory === item.name ? 'border-red-500' : 'border-transparent'} transition-all duration-300`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-3 text-gray-700 text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
        <hr className="mt-10 border-gray-200" />
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Image with + icon */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <button
                  className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-white text-black rounded-full shadow-md hover:bg-red-500 hover:text-white transition"
                  onClick={() => addToCart(item._id)}
                >
                  +
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-base capitalize">{item.name}</h3>
                  {/* Star Rating */}
                  <div className="flex items-center text-orange-400 text-sm">
                    <span className="mr-1">★★★★☆</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.description || item.name}</p>
                <p className="text-red-500 font-bold text-lg mt-2">₹{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 mt-10">No items found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
