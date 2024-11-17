import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useOrder } from '../../orderContext';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, removeFromCart, user } = useAuth(); 
  const { setOrderId } = useOrder();
  const [discountAmount, setDiscountAmount] = useState(0);
  const [giftCardAmount, setGiftCardAmount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const navigate = useNavigate();

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('https://zoopiceye-opticals.onrender.com/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const { _id, username } = response.data.user;
        setUserId(_id);
        setUserName(username);
        // Fetch payment methods for the user
        fetchUserPaymentMethods(_id);
      } else {
        alert('Failed to retrieve user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPaymentMethods = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/users/${userId}/payment-methods`);
      if (response.data.success) {
        setPaymentMethods(response.data.paymentMethods);
      } else {
        alert('Failed to retrieve payment methods');
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    } else {
      alert('User not authenticated. Redirecting to login.');
      navigate('/login');
    }
  }, [navigate]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalPrice = totalPrice - discountAmount - giftCardAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateAddress = () => {
    let validationErrors = {};
    if (!shippingAddress.street) validationErrors.street = 'Street is required';
    if (!shippingAddress.city) validationErrors.city = 'City is required';
    if (!shippingAddress.state) validationErrors.state = 'State is required';
    if (!shippingAddress.zip) validationErrors.zip = 'ZIP Code is required';
    // if (!shippingAddress.phone) validationErrors.phone = 'Phone number is required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress()) {
      alert('Please fill in all required shipping address fields.');
      return;
    }

    if (!userId) {
      alert('User not logged in or userId not found');
      return;
    }

    if (!cart || cart.length === 0) {
      alert('No items in the cart');
      return;
    }

    const orderData = {
      userId: userId,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: finalPrice,
      discountAmount,
      giftCardAmount,
      shippingAddress,
      paymentMethod, 
    };

    try {
      const response = await axios.post('http://localhost:4000/api/v1/orders', orderData);
      if (response.data.success) {
        localStorage.setItem('orderId', response.data.order._id);
        localStorage.setItem('orderData', JSON.stringify(response.data.order));
        alert('Order created successfully');
        navigate(`/payment-method/${response.data.order._id}`);

      } else {
        alert(response.data.message || 'Failed to create the order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-gray-100 min-h-screen mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h1>
      <h2 className="text-center text-lg text-gray-700 mb-6">
        {userName ? `Welcome, ${userName}` : 'Welcome!'}
      </h2>

      {/* Shipping Address Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>

        {/* Phone Number */}
        {/* <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingAddress.phone}
          onChange={handleInputChange}
          className={`w-full p-2 mb-4 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
        /> */}
        {/* {errors.phone && <p className="text-red-500">{errors.phone}</p>} */}

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={shippingAddress.street}
          onChange={handleInputChange}
          className={`w-full p-2 mb-4 border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {errors.street && <p className="text-red-500">{errors.street}</p>}

        {/* State Dropdown */}
        <select
          name="state"
          value={shippingAddress.state}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select State</option>
          <option value="California">Uttar Pradesh</option>
          <option value="New York">Uttarakhand</option>
          <option value="Texas">Bihar</option>
          <option value="Texas">Madhya Pradesh</option>
          <option value="Texas">Delhi</option>

        </select>
        {errors.state && <p className="text-red-500">{errors.state}</p>}

        {/* City Dropdown */}
        <select
          name="city"
          value={shippingAddress.city}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select City</option>
          <option value="Los Angeles">Prayagraj</option>
          <option value="New York City">Kanpur</option>
          <option value="Houston">Lucknow</option>
        </select>
        {errors.city && <p className="text-red-500">{errors.city}</p>}

        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={shippingAddress.zip}
          onChange={handleInputChange}
          className={`w-full p-2 mb-4 border ${errors.zip ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {errors.zip && <p className="text-red-500">{errors.zip}</p>}
      </div>

      {/* Payment Method Dropdown */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
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

        {/* Added Dropdown for Saved Payment Methods */}
        <h3 className="mt-4 text-lg font-semibold text-gray-700">Select Saved Payment Method:</h3>
        <select
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        >
          <option value="">-- Select Payment Method --</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.cardType} ending in {method.last4}
            </option>
          ))}
        </select>
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={`${item._id}-${index}`} className="flex justify-between items-center border-b py-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-lg font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
          
          {/* Total Summary */}
          {cart.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-gray-800 font-semibold">
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold">
                <span>Discount:</span>
                <span>- ₹{discountAmount}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold">
                <span>Gift Card:</span>
                <span>- ₹{giftCardAmount}</span>
              </div>
              <div className="flex justify-between text-gray-900 text-lg font-bold mt-2 border-t pt-2">
                <span>Total:</span>
                <span>₹{finalPrice}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
