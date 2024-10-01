import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentMethod = () => {
  const { orderId } = useParams(); // Extract orderId from the URL
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/checkout/${orderId}`); // Replace with your API endpoint

      if (response.ok) {
        const data = await response.json();
        setPaymentDetails(data);
      } else {
        const errorText = await response.text();
        console.error('Error fetching payment details:', errorText);
        setError('Failed to fetch payment details.');
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      setError('An error occurred while fetching payment details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchPaymentDetails();
    } else {
      setError('Invalid order ID provided.');
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return <p>Loading payment details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Payment Method Details for Order ID: {orderId}</h2>
      {paymentDetails ? (
        <div>
          <p><strong>Payment Status:</strong> {paymentDetails.status}</p>
          <p><strong>Total Amount:</strong> ₹{paymentDetails.totalAmount}</p>
          {/* Add more details as necessary */}
        </div>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
};

export default PaymentMethod;
