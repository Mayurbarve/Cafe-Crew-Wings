import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Something went wrong while updating status");
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await axios.delete(`${url}/api/order/delete/${orderId}`);
        if (response.data.success) {
          toast.success("Order deleted successfully");
          fetchAllOrders(); // Refresh the list
        } else {
          toast.error("Failed to delete order");
        }
      } catch (error) {
        toast.error("Something went wrong while deleting order");
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div className="order-details">
              <p className='order-item-food'>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className='order-item-name'>
                {order.customer.firstName} ({order.customer.email})
              </p>
              <p className='order-item-phone'>
                📞 {order.customer.phone} | 🪑 Table No: {order.customer.tableNo}
              </p>
              <p className='order-item-amount'>
                Total: {currency}{order.amount}
              </p>
              <p className='order-item-status'>
                Status:
                <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </p>
              <button onClick={() => deleteOrder(order._id)} className="order-delete-btn">
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
