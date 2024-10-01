import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = ({ product, onCheckout }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    
    alert(`Added ${product.brand} to cart!`);
  };

const ProductDetails = ({ product, onAddToCart }) => {
  return (
    <div>
      <h2>{product.brand}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};
  return (
    <div className="container mx-auto p-4">
      <div className="p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">{product.brand}</h2>
        <p className="mb-2">Price: ₹{product.price}</p>
        <p className="mb-2">Gender: {product.gender}</p>
        <p className="mb-2">Category: {product.category}</p>
        <div className="mt-4 flex space-x-4">
          <Link to="/Cart">
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add to Cart
            </button>
          </Link>
          <button
            onClick={onCheckout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
