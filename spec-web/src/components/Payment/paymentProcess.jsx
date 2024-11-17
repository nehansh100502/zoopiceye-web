import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentProcess = () => {
  const { orderId } = useParams(); // Retrieve orderId from URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the order details using the orderId
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`https://zoopiceye-opticals.onrender.com/api/v1/orders/${orderId}`);
      if (response.data.success) {
        setOrderDetails(response.data.order);
      } else {
        alert('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('An error occurred while fetching the order details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const paymentData = {
        orderId,
        paymentMethod,
      };

      const response = await axios.post('http://localhost:4000/api/v1/payments', paymentData);
      if (response.data.success) {
        alert('Payment successful');
        navigate(`/order-confirmation/${orderId}`);
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred during payment.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Payment Process</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {orderDetails && (
          <div>
            <p><strong>Order ID:</strong> {orderDetails._id}</p>
            <p><strong>Total Amount:</strong> ₹{orderDetails.totalAmount}</p>
          </div>
        )}

        {/* Payment Method Selection */}
        <div className="mt-60">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentProcess;
