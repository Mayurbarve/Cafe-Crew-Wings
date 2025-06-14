import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, currency } from '../../assets/assets';

const Order = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const confirmDelete = (orderId) => {
    setSelectedOrderId(orderId);
    setShowConfirm(true);
    setPassword('');
  };

  const handleDelete = async () => {
    if (password === '5942') {
      try {
        const response = await axios.delete(`${url}/api/order/delete/${selectedOrderId}`);
        if (response.data.success) {
          toast.success("Order deleted successfully");
          fetchAllOrders();
        } else {
          toast.error("Failed to delete order");
        }
      } catch (error) {
        toast.error("Something went wrong while deleting order");
      } finally {
        setShowConfirm(false);
      }
    } else {
      toast.error("Incorrect password");
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
              <button onClick={() => confirmDelete(order._id)} className="order-delete-btn">
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {/* Confirmation Modal */}
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Admin Confirmation</h2>
            <p className="modal-instruction">
              Please enter the 4-digit admin password to confirm deletion:
            </p>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={4}
              className="modal-input"
            />

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleDelete}>Confirm</button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Order;
