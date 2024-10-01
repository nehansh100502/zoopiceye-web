
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead

const WishlistCard = ({ item, onRemove }) => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  // Handler for navigating to the details page
  const handleViewDetails = () => {
    navigate(`/SpectacleDetail/${item._id}`); // Navigate to the item details page
  };
  
  const handleRemoveFromCart = () => {
    if (onRemove) {
      onRemove(item._id); // Invoke the onRemove function passed as a prop
    }
  };


  return (
    <div className="relative bg-[#eafefe] border border-gray-200 rounded-lg shadow-lg p-4 w-full transition-transform transform hover:scale-105 h-auto">
      {/* Image of the spectacle */}
      <img
        src={item.images && item.images.length > 0
          ? `http://localhost:4000/uploads/${item.images[0].replace('/uploads/', '')}`
          : `http://localhost:4000/uploads/default.jpg`}
        alt={item.name || 'Spectacle Image'}
        className="w-full h-48 object-cover rounded-md"
        onError={(e) => e.target.src = '/placeholder-image.jpg'}
      />

      <div className="p-2">
        {/* Name of the spectacle */}
        <h3 className="text-xl font-semibold mb-1 text-gray-800">{item.name}</h3>
        
        {/* Price of the spectacle */}
        <p className="text-gray-700 mb-2">Price: ₹{item.price}</p>
        
        {/* Category of the spectacle */}
        <p className="text-gray-600 ">{item.frameShape}</p>
        <p className="text-gray-600 ">{item.frameMaterial}</p>
        <p className="text-green-600 font-bold mb-4">{item.discount}% Off</p>
        
        <div className="flex flex-col space-y-2">
          {/* Button to view item details */}
          <button
            onClick={handleViewDetails}
            className="bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-400 transition duration-300 flex items-center justify-center h-10 w-full"
          >
            <span className="font-semibold">View Details</span>
          </button>

          {/* Button to remove from cart */}
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 flex items-center justify-center h-10 w-full"
          >
            <span className="font-semibold">Remove from Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
