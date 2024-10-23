import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelable, setIsCancelable] = useState(false); 
  const [cancelMessage, setCancelMessage] = useState(''); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data); 
        setLoading(false);

        // Check if the order is cancelable (within 24 hours)
        const orderDate = new Date(response.data.createdAt);
        const now = new Date();
        const hoursDifference = (now - orderDate) / (1000 * 60 * 60);
        setIsCancelable(hoursDifference < 24); 
      } catch (err) {
        console.error('Error fetching order details:', err);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Function to cancel the order
  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `http://localhost:4000/api/v1/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data);
      setCancelMessage('Your order has been canceled.');
    } catch (err) {
      console.error('Error canceling order:', err);
      setCancelMessage('Failed to cancel the order. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  const { street, city, state, zip } = order.shippingAddress || {};

  return (
    <>
      <div className='bg-[#a0f7f4] w-auto'>
        <h2 className='font-bold mt-24 text-center font-serif text-[#1179a2c3] text-2xl pt-5'>Full Order Details</h2>
        <div className="order-details mt-4 text-center">
          <table className="table-auto w-full border border-gray-300 mt-4 mx-auto max-w-3xl bg-white shadow-lg">
            <tbody>
              {/* Order Info */}
              <tr className="border-b bg-gray-100">
                <td className="font-bold p-4 text-left bg-[#13ada5] text-white">SKU</td>
                <td className="p-4">{order.items.sku}</td> 
              </tr>
              <tr className="border-b">
                <td className="font-bold p-4 text-left bg-[#08aaa2] text-white">Status</td>
                <td className="p-4">{order.status}</td>
              </tr>

              {/* Shipping Address */}
              <tr className="border-b bg-gray-100">
                <td className="font-bold p-4 text-left bg-[#10a29be6] text-white">Shipping Address</td>
                <td className="p-4">
                  {street && <p>Street: {street}</p>}
                  {city && <p>City: {city}</p>}
                  {state && <p>State: {state}</p>}
                  {zip && <p>Zip: {zip}</p>}
                </td>
              </tr>

              {/* Items */}
              <tr className="border-b">
                <td className="font-bold p-4 text-left bg-[#26b0a9f8] text-white">Items</td>
                <td className="p-4">
                  <table className="table-auto w-full border border-gray-300 bg-white">
                    <thead>
                      <tr>
                        <th className="border-b p-4 text-left bg-[#ffed4a]">Item Image</th>
                        <th className="border-b p-4 text-left bg-[#ffed4a]">Item Name</th>
                        <th className="border-b p-4 text-left bg-[#ffed4a]">SKU</th> 
                        <th className="border-b p-4 text-left bg-[#ffed4a]">Quantity</th>
                        <th className="border-b p-4 text-left bg-[#ffed4a]">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index} className="border-b bg-gray-50">
                          <td className="p-4">
                            {/* Display image, fallback if not available */}
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md shadow-md"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 text-gray-500 flex items-center justify-center">
                                No Image
                              </div>
                            )}
                          </td>
                          <td className="p-4">{item.name}</td>
                          <td className="p-4">{item.sku}</td> {/* Display SKU */}
                          <td className="p-4">{item.quantity}</td>
                          <td className="p-4">₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Total Amount */}
                    <tfoot>
                      <tr className="border-t bg-gray-100">
                        <td className="font-bold p-4 text-left bg-[#2fd5cc] text-white">Total Amount</td>
                        <td colSpan="4" className="p-4">₹{order.totalAmount}</td> {/* Adjust colspan */}
                      </tr>
                    </tfoot>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note on Order Cancellation */}
        <div className="mt-6 text-center">
          <p className="text-red-600 font-bold">
            You can cancel your order within 24 hours. After 24 hours, cancellation is not allowed.
          </p>
        </div>

        {/* Cancel Order Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleCancelOrder}
            disabled={!isCancelable || order.status === 'Cancelled'}
            className={`px-4 py-2 rounded-md text-white ${
              isCancelable && order.status !== 'Cancelled'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {order.status === 'Cancelled' ? 'Order Cancelled' : 'Cancel Order'}
          </button>
          {cancelMessage && <p className="mt-2 text-green-600">{cancelMessage}</p>}
        </div>

        {/* Contact Us Section */}
        <div className="contact-info text-center mt-8 bg-gray-200 p-4 rounded-md shadow-lg">
          <h3 className="font-bold text-lg text-[#1ac5bd]">Need Help?</h3>
          <p>If you have any issues with your order or need further details, feel free to contact our support team.</p>
          <p>Email: <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 234-567-890</a></p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
