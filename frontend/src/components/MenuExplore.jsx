import React from 'react';
import { Link } from 'react-router-dom';

import dessert from '../assets/dessert.jpg';
import sandwitch from '../assets/sandwitch.jpg';
import beverage from '../assets/beverage.jpg';
import burger from '../assets/burger.jpg';
import fries from '../assets/fries.jpg';
import maggi from '../assets/maggi.jpg';
import momos from '../assets/momos.jpg';
import pizza from '../assets/pizza.jpg';

const menuItems = [
  { name: 'Deserts', image: dessert },
  { name: 'Sandwich', image: sandwitch },
  { name: 'Beverage', image: beverage },
  { name: 'Burger', image: burger },
  { name: 'Fries', image: fries },
  { name: 'Maggi', image: maggi },
  { name: 'Momos', image: momos },
  { name: 'Pizza', image: pizza }
];

const MenuExplore = () => {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto justify-center text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">EXPLORE OUR MENU</h2>
      <p className="text-gray-600 mb-8 max-w-full">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${item.highlighted ? 'border-red-500' : 'border-transparent'} transition-all duration-300`}>
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
      <div className="text-center mt-8">
        <Link to="/collection">
          <button className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-2 rounded-full text-sm">
            See All Dishes →
          </button>
        </Link>
      </div>
      <hr className="mt-10 border-gray-200" />
    </section>
  );
};

export default MenuExplore;
