import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/ShopContext';

import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryCharge;

  if (!cartItems || !food_list) {
    return <div className="text-center py-10 text-lg">Loading cart...</div>;
  }

  const handlePromoSubmit = () => {
    if (promoCode.trim() === '') {
      alert('Please enter a promo code.');
    } else {
      alert(`Promo code "${promoCode}" submitted!`);
    }
  };

  return (
    <div className="w-full px-6 md:px-20 py-10">
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-6 font-semibold text-gray-700 border-b pb-2 mb-2">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {food_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => (
              <div key={item._id} className="grid grid-cols-6 items-center py-4 border-b text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 object-cover rounded"
                />
                <p>{item.name}</p>
                <p>{currency}{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{currency}{item.price * cartItems[item._id]}</p>
                <button
                  className="text-red-500 font-bold text-lg"
                  onClick={() => removeFromCart(item._id)}
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-between mt-10">
        {/* Cart Totals */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{currency}{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>{currency}{subtotal === 0 ? 0 : deliveryCharge}</p>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <p>Total</p>
              <p>{currency}{total}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/place-order')}
            disabled={subtotal === 0}
            className={`mt-6 w-full py-2 rounded text-white font-medium ${
              subtotal === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded shadow">
          <p className="mb-2">If you have a promo code, enter it here:</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handlePromoSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
