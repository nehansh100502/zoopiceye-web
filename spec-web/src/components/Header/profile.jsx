// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
// import axios from 'axios';

// const Profile = () => {
//   const { user, logout } = useAuth(); // Ensure that `user` is being fetched correctly from your context
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]); // Store the list of orders
//   const [showModal, setShowModal] = useState(false); // State for the confirmation modal
//   const [showOrders, setShowOrders] = useState(false); // State for order dropdown visibility

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Toggle the visibility of the order list
//   const toggleOrders = () => {
//     setShowOrders(!showOrders); // Toggle the state
//   };

//   // Fetch all orders for the logged-in user
//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user || !user._id) {
//         console.error("User ID is missing.");
//         return;
//       }

//       // console.log(`Fetching orders from URL: http://localhost:4000/api/v1/orders/user/${user._id}`);
//       // console.log('Authorization Token:', localStorage.getItem('userToken'));

//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/orders/user/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Include authorization header if needed
//           },
//         });
//         setOrders(response.data); // Assuming the response is an array of orders
//       } catch (err) {
//         if (err.response) {
//           console.error("Failed to fetch orders:", err.response.data, "Status:", err.response.status);
//         } else if (err.request) {
//           console.error("No response received:", err.request);
//         } else {
//           console.error("Error:", err.message);
//         }
//       }
//     };

//     if (user?._id) {
//       fetchOrders();
//     }
//   }, [user._id]);

//   const handleDeleteAccount = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/api/v1/users/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`, 
//         },
//       });
//       alert('Your account has been deleted successfully.');
//       logout(); 
//       navigate('/login'); 
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert('There was an error deleting your account. Please try again.');
//     }
//   };

//   return (
//     <div className='flex flex-col bg-gradient-to-r from-[#0472a9] to-[#0e1211] w-full md:w-[auto] border-4 border-[white] h-[auto] pl-4 pt-4'>
//       <div className='text-center pt-24'>
//         {/* <h2 className="text-lg font-semibold mt-3">{user?.username || ""}</h2> */}
//         {/* <p className="text-sm text-[#06f64ad9]">{user?.email || ""}</p> */}
//       </div>
//       <div className="flex flex-col text-[#f6eef6fb]">
//         <Link
//           to="/"
//           className={`flex items-center gap-1 hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300`}
//         >
//           <span>Home</span>
//         </Link>
//         <Link
//           to="/UserProfile"
//           className={`flex items-center gap-1  hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300`}
//         >
//           <span> My Profile</span>
//         </Link>

//         {/* Orders Section */}
//         <div className="">
//           <h3
//            className={`flex items-center gap-1  hover:text-white hover:bg-[#18a0b9] px-3 py-2 rounded-md transition-all duration-300 cursor-pointer`}
//             onClick={toggleOrders} // Toggle order list visibility
//           >
//             My Orders
//           </h3>

//           {showOrders && (
//             <ul className="bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] text-[white] p-2 rounded-md w-44"> 
//               {orders.length > 0 ? (
//                 orders.map((order) => (
//                   <li key={order._id} className="mb-2">
//                     <Link
//                       to={`/orders/${order._id}`} // Correctly route to the order details page
//                       className="text-[yellow] hover:underline"
//                     >
//                       {/* Display order number, product name, and order date */}

//                       {order.items.length > 0 && order.items[0].productId ? ` ${order.items[0].productId.name}` : ''}
//                       {order.orderDate ? ` - Order Date: ${new Date(order.orderDate).toLocaleDateString()}` : ''}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <p>No orders found.</p>
//               )}

//             </ul>
//           )}
//         </div>

//         <Link
//           to="/spectacleList"
//           className={`flex items-center gap-1  hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300`}
//         >
//           <span>My Store/Collections</span>
//         </Link>

//         <Link to="/StoreLocator" className="flex items-center gap-1 hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300">
//           <span>Location/Map</span>
//         </Link>

//         <Link to="/Contact" className="flex items-center gap-1  hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300">
//           <span>Contact Us</span>
//         </Link>

//         <Link to="/About" className="flex items-center gap-1  hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300">
//           <span>About Us</span>
//         </Link>

//         {/* Settings / Delete Account Link */}
//         <div className="flex items-center gap-1  hover:text-white hover:bg-[#189AB4] px-3 py-2 rounded-md transition-all duration-300 cursor-pointer" onClick={() => setShowModal(true)}>
//           <span>Account Settings</span>
//         </div>
//       </div>

//       <div className='mt-8 mb-5'>
//         <button
//           onClick={handleLogout}
//           className="w-[150px] py-1 hover:bg-red-700  rounded-md transition-all duration-300"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-5 text-center">
//             <h3 className="text-lg font-semibold">Delete Account</h3>
//             <p className="mt-2 text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
//             <div className="mt-4">
//               <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 mr-2">
//                 Yes, Delete Permanently
//               </button>
//               <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
// import axios from 'axios';

// const Profile = () => {
//   const { user, logout } = useAuth(); // Ensure that `user` is being fetched correctly from your context
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]); // Store the list of orders
//   const [showModal, setShowModal] = useState(false); // State for the confirmation modal
//   const [showOrders, setShowOrders] = useState(false); // State for order dropdown visibility

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Toggle the visibility of the order list
//   const toggleOrders = () => {
//     setShowOrders(!showOrders); // Toggle the state
//   };

//   // Fetch all orders for the logged-in user
//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user || !user._id) {
//         console.error("User ID is missing.");
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/orders/user/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Include authorization header if needed
//           },
//         });
//         setOrders(response.data); // Assuming the response is an array of orders
//       } catch (err) {
//         if (err.response) {
//           console.error("Failed to fetch orders:", err.response.data, "Status:", err.response.status);
//         } else if (err.request) {
//           console.error("No response received:", err.request);
//         } else {
//           console.error("Error:", err.message);
//         }
//       }
//     };

//     if (user?._id) {
//       fetchOrders();
//     }
//   }, [user._id]);

//   const handleDeleteAccount = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/api/v1/users/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`, 
//         },
//       });
//       alert('Your account has been deleted successfully.');
//       logout(); 
//       navigate('/login'); 
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert('There was an error deleting your account. Please try again.');
//     }
//   };

//   return (
//     <div className='flex flex-col bg-gradient-to-r from-[#0472a9] to-[#0e1211] w-full md:w-[auto] border-4 border-[white] h-[auto] pl-4 pt-4'>
//       <div className='text-center pt-24'>
//         {/* <h2 className="text-lg font-semibold mt-3">{user?.username || ""}</h2> */}
//         {/* <p className="text-sm text-[#06f64ad9]">{user?.email || ""}</p> */}
//       </div>
//       <div className="flex flex-col text-[#f6eef6fb]">
//         <Link
//           to="/"
//           className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2`} // Added translate-x-2 for slight movement to the right
//         >
//           <span>Home</span>
//         </Link>
//         <Link
//           to="/UserProfile"
//           className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2`}
//         >
//           <span> My Profile</span>
//         </Link>

//         {/* Orders Section */}
//         <div className="">
//           <h3
//            className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-x-2`}
//             onClick={toggleOrders} // Toggle order list visibility
//           >
//             My Orders
//           </h3>

//           {showOrders && (
//             <ul className="bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] text-[white] p-2 rounded-md w-44"> 
//               {orders.length > 0 ? (
//                 orders.map((order) => (
//                   <li key={order._id} className="mb-2">
//                     <Link
//                       to={`/orders/${order._id}`} // Correctly route to the order details page
//                       className="text-[yellow] hover:underline"
//                     >
//                       {/* Display order number, product name, and order date */}

//                       {order.items.length > 0 && order.items[0].productId ? ` ${order.items[0].productId.name}` : ''}
//                       {order.orderDate ? ` - Order Date: ${new Date(order.orderDate).toLocaleDateString()}` : ''}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <p>No orders found.</p>
//               )}

//             </ul>
//           )}
//         </div>

//         <Link
//           to="/spectacleList"
//           className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2`}
//         >
//           <span>My Store/Collections</span>
//         </Link>

//         <Link to="/StoreLocator" className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
//           <span>Location/Map</span>
//         </Link>

//         <Link to="/Contact" className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
//           <span>Contact Us</span>
//         </Link>

//         <Link to="/About" className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
//           <span>About Us</span>
//         </Link>

//         {/* Settings / Delete Account Link */}
//         <div className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-x-2" onClick={() => setShowModal(true)}>
//           <span>Account Settings</span>
//         </div>
//       </div>

//       <div className='mt-8 mb-5'>
//         <button
//           onClick={handleLogout}
//           className="w-[150px] py-1 hover:bg-red-500  text-white rounded-md transition-all duration-300"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-5 text-center">
//             <h3 className="text-lg font-semibold">Delete Account</h3>
//             <p className="mt-2 text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
//             <div className="mt-4">
//               <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 mr-2">
//                 Yes, Delete Permanently
//               </button>
//               <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { FaHome, FaUserAlt, FaBoxOpen, FaStore, FaMapMarkerAlt, FaEnvelope, FaInfoCircle, FaCog } from 'react-icons/fa'; // Import icons from react-icons

const Profile = () => {
  const { user, logout } = useAuth(); // Ensure that `user` is being fetched correctly from your context
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Store the list of orders
  const [showModal, setShowModal] = useState(false); // State for the confirmation modal
  const [showOrders, setShowOrders] = useState(false); // State for order dropdown visibility

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Toggle the visibility of the order list
  const toggleOrders = () => {
    setShowOrders(!showOrders); // Toggle the state
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
            Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Include authorization header if needed
          },
        });
        setOrders(response.data); // Assuming the response is an array of orders
      } catch (err) {
        if (err.response) {
          console.error("Failed to fetch orders:", err.response.data, "Status:", err.response.status);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user._id]);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`, 
        },
      });
      alert('Your account has been deleted successfully.');
      logout(); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('There was an error deleting your account. Please try again.');
    }
  };

  return (
    <div className='flex flex-col bg-gradient-to-r from-[#0472a9] to-[#0e1211] w-full md:w-[auto] border-4 border-[white] h-[auto] pl-4 pt-4'>
      <div className='text-center pt-24'>
        {/* <h2 className="text-lg font-semibold mt-3">{user?.username || ""}</h2> */}
        {/* <p className="text-sm text-[#06f64ad9]">{user?.email || ""}</p> */}
      </div>
      <div className="flex flex-col text-[#f6eef6fb]">
        <Link
          to="/"
          className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2`}
        >
          <FaHome /> {/* Home icon */}
          <span>Home</span>
        </Link>
        <Link
          to="/UserProfile"
          className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2`}
        >
          <FaUserAlt /> {/* User Profile icon */}
          <span>My Profile</span>
        </Link>

        {/* Orders Section */}
        <div className="">
          <h3
            className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-x-2`}
            onClick={toggleOrders} // Toggle order list visibility
          >
            <FaBoxOpen /> {/* Orders icon */}
            My Orders
          </h3>

          {showOrders && (
            <ul className="bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] text-[white] p-2 rounded-md w-44"> 
              {orders.length > 0 ? (
                orders.map((order) => (
                  <li key={order._id} className="mb-2">
                    <Link
                      to={`/orders/${order._id}`} // Correctly route to the order details page
                      className="text-[yellow] hover:underline"
                    >
                      {/* Display order number, product name, and order date */}

                      {order.items.length > 0 && order.items[0].productId ? ` ${order.items[0].productId.name}` : ''}
                      {order.orderDate ? ` - Order Date: ${new Date(order.orderDate).toLocaleDateString()}` : ''}
                    </Link>
                  </li>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </ul>
          )}
        </div>

        <Link
          to="/spectacleList"
          className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2`}
        >
          <FaStore /> {/* Store icon */}
          <span>My Store/Collections</span>
        </Link>

        <Link to="/StoreLocator" className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
          <FaMapMarkerAlt /> {/* Location/Map icon */}
          <span>Location/Map</span>
        </Link>

        <Link to="/Contact" className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
          <FaEnvelope /> {/* Contact icon */}
          <span>Contact Us</span>
        </Link>

        <Link to="/About" className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 hover:translate-x-2">
          <FaInfoCircle /> {/* About icon */}
          <span>About Us</span>
        </Link>

        {/* Settings / Delete Account Link */}
        <div className="flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-x-2" onClick={() => setShowModal(true)}>
          <FaCog /> {/* Account Settings icon */}
          <span>Account Settings</span>
        </div>
      </div>

      <div className='mt-8 mb-5'>
        <button
          onClick={handleLogout}
          className="w-[150px] py-1 hover:bg-red-700  rounded-md transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 text-center">
            <h3 className="text-lg font-semibold">Delete Account</h3>
            <p className="mt-2 text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="mt-4">
              <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 mr-2">
                Yes, Delete Permanently
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
