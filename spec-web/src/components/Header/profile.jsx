import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { FaHome, FaUserAlt, FaBoxOpen, FaStore, FaMapMarkerAlt, FaEnvelope, FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Toggle the visibility of the order list
  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  // Fetch all orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user._id) {
        console.error("User ID is missing.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/v1/orders/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user._id]);

  return (
    <div className='flex flex-col bg-gradient-to-r from-[#0472a9] to-[#0e1211] w-full md:w-auto border-4 border-white h-auto p-4 pt-4'>
      <div className='text-center pt-24'>
        {/* User profile details can go here */}
      </div>

      <div className="flex flex-col text-white">
        <Link to="/" className='flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2'>
          <FaHome />
          <span>Home</span>
        </Link>

        <Link to="/UserProfile" className='flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2'>
          <FaUserAlt />
          <span>My Profile</span>
        </Link>

        {/* Orders Section with Dropdown */}
        <div className="relative">
          <div
            className='flex items-center justify-between gap-2 px-3 py-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-x-2'
            onClick={toggleOrders}
          >
            <span className="flex items-center gap-2">
              <FaBoxOpen />
              My Orders
            </span>
            {showOrders ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          {/* Dropdown List */}
          {showOrders && (
            <ul className="absolute left-0 mt-2 bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] text-white p-4 rounded-md w-full z-10 shadow-lg max-h-[200px] overflow-auto sm:max-h-[400px]">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <li key={order._id} className="mb-2 p-2 bg-[#03394a] rounded-md">
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-white hover:underline"
                    >
                      {/* Display each product name, quantity, and price */}
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {/* Assuming `productId` contains product details */}
                          {item.productId?.name && (
                            <div>
                              <strong>Product: </strong>   {item.productId.name}
                            </div>
                          )}
                          <div>
                            <strong>Quantity: </strong>   {item.quantity}
                          </div>
                          <div>
                            <strong>Price:</strong>    ${item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <div>
                        <strong>Order Date:  </strong> {new Date(order.createdAt).toLocaleDateString()}
                      </div>

                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-center">No orders found.</p>
              )}
            </ul>
          )}
        </div>

        <Link to="/spectacleList" className='flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2'>
          <FaStore />
          <span>My Store/Collections</span>
        </Link>

        <Link to="/StoreLocator" className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
          <FaMapMarkerAlt />
          <span>Location/Map</span>
        </Link>

        <Link to="/Contact" className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
          <FaEnvelope />
          <span>Contact Us</span>
        </Link>

        <Link to="/About" className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
          <FaInfoCircle />
          <span>About Us</span>
        </Link>

        <div className='mt-2 mb-5'>
          <button
            onClick={handleLogout}
            className="w-[150px] py-1 hover:bg-red-700 bg-[#2f96cd] text-white rounded-md transition-all duration-300 border-2 border-spacing-3 border-double border-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
