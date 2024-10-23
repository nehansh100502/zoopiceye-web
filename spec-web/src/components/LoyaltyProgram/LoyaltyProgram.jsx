import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 

const LoyaltyProgram = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get("https://api.example.com/user/loyalty-points");
        setUserPoints(response.data.points);
      } catch (error) {
        console.error("Error fetching user points:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPoints();
  }, []);

  const redeemPoints = async () => {
    try {
      const response = await axios.post("https://api.example.com/user/redeem-points", {
        pointsToRedeem: userPoints,
      }); 
      setDiscount(response.data.discount);
    } catch (error) {
      console.error("Error redeeming points:", error);
    }
  };
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Join Our Loyalty Program</h2>
        <p className="text-lg mb-8">
          Earn points with every purchase and enjoy exclusive member-only discounts.
        </p>

        {loading ? (
          <p>Loading your loyalty points...</p>
        ) : (
          <>
            <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-semibold">Your Points: {userPoints}</h3>
              <p className="text-gray-600">Collect more points and redeem them for discounts on future purchases!</p>
            </div>

            {discount > 0 ? (
              <div className="bg-green-100 p-6 rounded-lg">
                <h4 className="text-2xl font-semibold text-green-600">
                  You've redeemed a discount of {discount}!
                </h4>
                <p className="text-green-600">Apply this discount to your next purchase.</p>
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-md transition hover:bg-blue-600"
                onClick={redeemPoints}
                disabled={userPoints === 0}
              >
                Redeem Your Points
              </button>
            )}

            <div className="mt-6">
              <Link to="/shop" className="text-blue-500 underline">
                Start Shopping to Earn More Points
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoyaltyProgram;
