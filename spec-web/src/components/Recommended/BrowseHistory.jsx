import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios for API requests

// Mock user browsing history (In a real scenario, fetch from the server)
const userBrowsingHistory = ["Eyeglasses", "Sunglasses"];

const RecommendedProducts = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch products from the API and generate recommendations
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get("https://api.example.com/spectacles");
        const products = response.data;

        // Filter products based on user's browsing history
        const recommendations = products.filter((product) =>
          userBrowsingHistory.includes(product.category)
        );

        setRecommendedProducts(recommendations);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading recommendations...</p>;
  }

  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8 text-[#2d899c]">Recommended For You</h2>
        {recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-4 transition transform hover:scale-105"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No recommendations available at this time.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;
