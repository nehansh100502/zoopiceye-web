import React, { useState, useEffect } from 'react';
import SpinWheel from './spinWheel';
import LoyaltyProgram from '../LoyaltyProgram/LoyaltyProgram';

const OffersPage = () => {
  // State to manage offers from the backend
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Fetch offers when the component mounts
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/getOffers');
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Timer Logic to calculate remaining time until 24 hours
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); // Set to next day's midnight

      const difference = tomorrow - now; // Time difference in milliseconds

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    // Initial call to set the timer
    calculateTimeLeft();

    // Update the timer every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Handle spinning the wheel
  const handleSpin = () => {
    console.log('Spin wheel has been spun!');
    // You can handle additional logic here, like showing the result of the spin
  };

  if (loading) {
    return <div>Loading offers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // You can update this to dynamically load spin wheel offers from the backend if needed
  const offerOptions = ['10% off', '15% off', 'Offer 5', 'Offer 6', 'Offer 7', 'Offer 8'];

  return (
    <>

      <div className="p-4 mt-20 bg-[#f6f9f9] h-[600px] pt-10">
            {/* Timer Display */}
            <div className="text-center mt-6">
          <h2 className="text-3xl text-black">Next offer refreshes in:</h2>
          <div className="text-2xl font-bold text-red-500 mt-2">
            {`${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`}
          </div>
        </div>
        <LoyaltyProgram />
        {/* <h1 className="text-5xl font-bold text-black mb-4 text-center">Spin the Wheel for More Offers!</h1> */}
        {/* <SpinWheel segments={offerOptions} onSpin={handleSpin} /> */}
      </div>
      <div className='pt-11 bg-[#14a2af] h-[100%] cursor-pointer'>
        <div className="offers-container">
          <h2 className="text-5xl font-bold text-center mt-24 text-white">FASHION SALES UP to 70%</h2>
          <h2 className="text-4xl font-bold text-center mt-3 text-[#a7f114] mb-20">WEEKLY OFFERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {offers.map((offer) => (
              <div key={offer.id} className="offer-card border rounded-md shadow-md overflow-hidden">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-[#fcfcfc]">
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                  <p className="text-gray-700 mt-2">{offer.description}</p>
                  <p className="text-green-700 font-bold mt-2">{offer.discount}% Off</p>
                  <a
                    href={offer.link}
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     
    </>
  );
};

export default OffersPage;
