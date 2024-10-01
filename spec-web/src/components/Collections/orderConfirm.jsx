
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/orders/${orderId}`);

      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      } else {
        const errorText = await response.text();
        console.error('Error fetching order details:', errorText);
        setError('Failed to fetch order details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Error occurred while fetching order details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      console.error('Invalid orderId:', orderId);
      setError('Invalid order ID provided.');
      setLoading(false);
    }
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/orders/cancel/${orderId}`, {
          method: 'PATCH',
        });

        if (response.ok) {
          alert('Order has been cancelled.');
          navigate('/'); // Redirect to home or order list page
        } else {
          const errorText = await response.text();
          console.error('Failed to cancel order:', errorText);
          alert('Failed to cancel order. Please try again later.');
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Error occurred. Please try again later.');
      }
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading order details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-10 bg-gray-100 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Order Confirmation</h1>
      {orderDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order ID: {orderDetails.id}</h2>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Delivery Address:</strong> {orderDetails.address}</p>
          <p><strong>Total Price:</strong> ₹{orderDetails.totalPrice}</p>
          <p><strong>Location:</strong> {orderDetails.location}</p>

          {orderDetails.status === 'Pending' && (
            <button
              onClick={handleCancelOrder}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Cancel Order
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No order details available.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
