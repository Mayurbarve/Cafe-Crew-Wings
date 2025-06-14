import React, { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../context/ShopContext';
import axios from 'axios';
import BillReceipt from '../components/BillReceipt';
import html2canvas from 'html2canvas'; // ✅ Added
import jsPDF from 'jspdf'; // ✅ Added

const Orders = () => {
  const { url, token, currency, user } = useContext(StoreContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBill, setShowBill] = useState(false);

  const [billCustomer, setBillCustomer] = useState('');
  const [billTableNo, setBillTableNo] = useState('');

  const billRef = useRef(); // ✅ Added ref for BillReceipt

  const loadOrderData = async () => {
    try {
      const localEmail = localStorage.getItem("email");
      const email = localEmail || user?.email;

      if (!email) {
        console.warn("Email is missing");
        setOrderData([]);
        setLoading(false);
        return;
      }

      const response = await axios.post(`${url}/api/order/userorders`, { email });

      if (response.data.success) {
        const allOrdersItem = [];
        let extractedCustomer = '';
        let extractedTableNo = '';

        response.data.data?.forEach(order => {
          const customerName = order.customer?.firstName || 'Customer';
          const table = order.customer?.tableNo || '12';

          extractedCustomer = customerName;
          extractedTableNo = table;

          order.items?.forEach(item => {
            allOrdersItem.push({
              name: item.name || "Unnamed Item",
              price: item.price || 0,
              quantity: item.quantity || 1,
              date: order.date || new Date(),
              status: order.status || "Processing",
              payment: order.payment,
              paymentMethod: order.paymentMethod || (order.payment ? 'Paid' : 'Cash')
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
        setBillCustomer(extractedCustomer);
        setBillTableNo(extractedTableNo);
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

  const totalAmount = orderData.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // ✅ Download Handler
  const handleDownload = () => {
    const input = billRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Cafe-CrewWings-Bill.pdf');
    });
  };

  return (
    <div className='border-t pt-16 px-4 md:px-16'>
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
          <>
            {orderData.map((item, index) => (
              <div
                key={index}
                className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
              >
                <div className='flex items-start gap-6 text-sm'>
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700'>
                      <p className='text-lg'>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
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
            ))}

            {/* View Bill Button */}
            <div className='text-center mt-6'>
              <button
                onClick={() => setShowBill(true)}
                className='bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800'
              >
                View Total Bill
              </button>
            </div>

            {/* Bill Receipt for all orders */}
            {showBill && (
              <div className='mt-8'>
                <div ref={billRef}>
                  <BillReceipt
                    customer={billCustomer}
                    tableNo={billTableNo}
                    items={orderData.map(item => ({
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price
                    }))}
                    totalAmount={totalAmount}
                  />
                </div>

                {/* ✅ Download + Close */}
                <div className='text-center mt-4 flex flex-col items-center gap-2'>
                  <button
                    onClick={handleDownload}
                    className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600'
                  >
                    Download Bill
                  </button>

                  <button
                    onClick={() => setShowBill(false)}
                    className='text-sm text-red-500 underline mt-2'
                  >
                    Close Bill
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
