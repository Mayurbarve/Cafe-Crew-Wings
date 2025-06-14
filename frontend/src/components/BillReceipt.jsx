import React from 'react';

const BillReceipt = ({ customer, tableNo, items, totalAmount }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded text-gray-800 font-serif border">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Cafe Crew Wings</h1>
        <p className="text-sm text-gray-600">Near Sbi Atm, Anmol Nagar, Wathoda Road, Nagpur</p>
      </div>

      <div className="flex justify-between text-sm mb-4 border-b pb-2">
        <p><strong>Customer:</strong> {customer}</p>
        <p><strong>Table No:</strong> {tableNo}</p>
        <p><strong>Date:</strong> {currentDate}</p>
      </div>

      <table className="w-full text-left text-sm mb-6">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2">Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-2">{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end pr-2 text-lg font-semibold mb-4">
        Total: ₹{totalAmount.toFixed(2)}
      </div>

      <p className="text-center text-sm font-medium text-gray-700 mt-6">Thank you!</p>
    </div>
  );
};

export default BillReceipt;
