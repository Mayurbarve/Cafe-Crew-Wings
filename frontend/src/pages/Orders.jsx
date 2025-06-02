import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { url, token, currency, user } = useContext(StoreContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      const localEmail = localStorage.getItem("email");
      const email = localEmail || user?.email;

      console.log("Local email:", localEmail, "User context email:", user?.email);

      if (!email) {
        console.warn("Email is missing");
        setOrderData([]);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${url}/api/order/userorders`,
        { email }
      );

      if (response.data.success) {
        const allOrdersItem = [];

        console.log("Fetched orders:", response.data.data);

        response.data.data?.forEach(order => {
          order.items?.forEach(item => {
            allOrdersItem.push({
              image: item.image || "/default.jpg",
              name: item.name || "Unnamed Item",
              price: item.price || 0,
              quantity: item.quantity || 1,
              size: item.size || "N/A",
              status: order.status || "Processing",
              payment: order.payment,
              paymentMethod: order.paymentMethod || (order.payment ? 'Paid' : 'Cash'),
              date: order.date || new Date(),
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        console.warn("Order fetch failed:", response.data.message);
        setOrderData([]);
      }
    } catch (error) {
      console.error("Failed to load order data:", error);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <h2 className="text-3xl font-bold mb-5">
          My <span className="relative inline-block">
            Orders
            <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
          </span>
        </h2>
      </div>

      <div>
        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading orders...</p>
        ) : orderData.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 object-cover rounded' src={item.image} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className={`w-2 h-2 rounded-full ${item.status === 'Order Placed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
