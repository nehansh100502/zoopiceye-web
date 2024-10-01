import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import CartCard from './cartCard';

const Cart = () => {
  const { cart } = useAuth();

  return (
    <div className="p-4 md:p-10 bg-gradient-to-b from-[#0f90c3] to-[#06275f] min-h-screen text-white rounded-lg shadow-lg max-w-7xl mx-auto mt-20" >
      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center mt-14">Your Cart</h2>
          <p className="mb-4 text-lg">Your cart is empty.</p>
          <Link
            to="/SpectacleList" // Link to the collection page
            className="bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-xl w-60 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-300 mt-4 inline-block"
          >
            Continue Shopping
          </Link>
        </div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <CartCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
