import React, { useContext } from 'react';
import { StoreContext } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, getTotalCartAmount } = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const delivery_fee = subtotal === 0 ? 0 : 0;
  const total = subtotal + delivery_fee;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold">
        Cart <span className="relative inline-block">
          Total
          <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
        </span>
      </h2>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Extra Charges</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
