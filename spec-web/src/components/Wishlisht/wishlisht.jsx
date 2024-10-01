import React from 'react';
import { useAuth } from '../../AuthContext';
import WishlistCard from './wishlishtCard'; // Import the new WishlistCard component
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useAuth();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div className="p-20 bg-[#1ea1a3] text-white min-h-screen rounded-lg shadow-lg max-w-7xl mx-auto mt-11">
      {wishlist.length === 0 ? (
        <div className='text-center'>
          <h2 className="text-4xl font-semibold mb-4 mt-12">Your Wishlist</h2>
          <p>Your wishlist is empty.</p>
          <Link
            to="/SpectacleList" // Link to the collection page
            className="bg-[#a3ecf7] text-xl w-60 text-black py-2 px-4 rounded-lg shadow-lg hover:bg-blue-300 mt-4 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <WishlistCard
              key={item._id}
              item={item}
              onRemove={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
