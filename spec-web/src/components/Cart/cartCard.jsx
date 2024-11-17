import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const CartCard = ({ item }) => {
  const { removeFromCart } = useAuth();
  const navigate = useNavigate();

  // Handler for navigating to the details page
  const handleViewDetails = () => {
    navigate(`/SpectacleDetail/${item._id}`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item._id);
  };

  return (
    <div className="relative bg-[#eafefe] border border-gray-200 rounded-lg shadow-lg p-4 h-auto w-full transition-transform transform hover:scale-105">
      <img
        src={item.images && item.images.length > 0 
          ? `https://zoopiceye-opticals.onrender.com/uploads/${item.images[0].replace('/uploads/', '')}`
          : `https://zoopiceye-opticals.onrender.com/uploads/default.jpg`}
        alt={item.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="p-2">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-700 text-sm line-clamp-2">{item.frameShape}</p>
          <p className="text-gray-700 text-sm line-clamp-2">{item.frameMaterial}</p>
          <p className="text-gray-800 font-bold text-lg">₹{item.price}</p> 
          <p className="text-green-700 text-sm font-semibold">{item.discount}% Off</p>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Button to view item details */}
          <button
            onClick={handleViewDetails}
            className="bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#15b8f9] transition duration-300 flex items-center justify-center h-10 w-full"
          >
            <span className="font-semibold">View Details</span>
          </button>

          {/* Button to remove from cart */}
          <button
            onClick={handleRemoveFromCart}
            className="bg-[#ff2929be] text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 flex items-center justify-center h-10 w-full"
          >
            <span className="font-semibold">Remove from Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
