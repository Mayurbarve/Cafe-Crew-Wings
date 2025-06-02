import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartTotal from '../components/CartTotal';
import { StoreContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    url,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    food_list,
  } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    tableNo: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];

      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const itemInfo = food_list.find(product => product._id === productId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity
            });
          }
        }
      }

      const orderData = {
        customer: formData,
        items: orderItems,
        amount: getTotalCartAmount()
      };

      const response = await axios.post(`${url}/api/order/place`, orderData);

      if (response.data.success) {
        localStorage.setItem("email", formData.email);
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate('/orders');
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <h2 className="text-3xl font-bold">
            Delivery <span className="relative inline-block">
              Information
              <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
            </span>
          </h2>
        </div>

        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" />
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address' type="email" />
        <input required onChange={onChangeHandler} name='tableNo' value={formData.tableNo} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Table No.' type="text" />
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone Number' type="tel" />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-red-500 text-white px-16 py-3 text-sm rounded-2xl'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
