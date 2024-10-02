import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Slider from 'react-slick';
import { useAuth } from '../../AuthContext';
import './spectacle.css';

const SpectacleCard = ({ spectacle, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, wishlist } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(
    !!wishlist.find((item) => item._id === spectacle._id)
  );

  const handleShopNow = () => {
    navigate(`/SpectacleDetail/${spectacle._id}`);
  };


  const handleWishlistToggle = (event) => {
    event.stopPropagation(); // Prevent event bubbling to card click
    if (isWishlisted) {
      removeFromWishlist(spectacle._id);
    } else {
      addToWishlist(spectacle);
    }
    setIsWishlisted(!isWishlisted);
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div>
        <div
          onClick={onSelect} // Handle click to select the card\
          className={`relative border border-gray-200 rounded-lg shadow-lg p-4 h-auto w-full transition-transform transform hover:scale-105 cursor-pointer ${isSelected ? 'bg-blue-100' : 'bg-gradient-to-t from-[#f2fbff] to-[#fafafacb]'
            }`} // Apply conditional styling based on selection
        >
          {/* Image Slider */}
          {spectacle.images && spectacle.images.length > 0 ? (
            <Slider {...settings} className="mb-4">
              {spectacle.images.map((image, index) => {
                const finalImageUrl = `http://localhost:4000/uploads/${image.replace('/uploads/', '')}`;
                return (
                  <div key={index} className="relative">
                    <h2 className='text-[#61ff35] bg-gradient-to-r from-[#0795c0] to-[#1430bfcb] w-24 h-7 rounded-tl-xl rounded-br-xl p-1 text-sm'>New Arrivals*</h2>
                    <img
                      src={finalImageUrl}
                      alt={spectacle.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <img
              src={`http://localhost:4000/uploads/default.jpg`} // Default image if no images exist
              alt={spectacle.name}
              className="w-full h-48 object-cover rounded-md"
            />
          )}

          <div className="p-2">
            <h3 className="text-xl font-semibold mb-1 text-gray-800">{spectacle.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{spectacle.description}</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-800 font-bold text-lg">₹{spectacle.price}</p>
              <p className="text-green-600 text-sm font-bold "> {spectacle.discount}% Off</p>
            </div>

            <div className="flex justify-between items-center mb-2">
              <button
                onClick={handleWishlistToggle} // Handle wishlist toggle
                className="text-red-500 transition-colors duration-300 hover:text-red-600"
              >
                {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event bubbling to card click
                  handleShopNow();
                }}
                className="bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#2e84a9] transition duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SpectacleList = () => {
  const [spectacles, setSpectacles] = useState([]); // Initialize spectacles state
  const [filteredSpectacles, setFilteredSpectacles] = useState([]); // Initialize filtered spectacles
  const [selectedSpectacle, setSelectedSpectacle] = useState(null); // Track selected spectacle

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedFrameMaterial, setSelectedFrameMaterial] = useState('');
  const [selectedFrameShape, setSelectedFrameShape] = useState('');
  const [selectedColor, setSelectedColor] = useState('');


  useEffect(() => {
    const fetchSpectacles = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/spectacles');
        if (response.ok) {
          const data = await response.json();

          // Sort spectacles by _id or createdAt so the newest ones appear first
          const sortedSpectacles = data.sort((a, b) => {
            // Assuming _id or createdAt to sort (newest first)
            // If you have createdAt field, use: new Date(b.createdAt) - new Date(a.createdAt)
            return b._id.localeCompare(a._id);
          });

          setSpectacles(sortedSpectacles);
          setFilteredSpectacles(sortedSpectacles); // Initialize filtered spectacles to all spectacles
        } else {
          console.error('Failed to fetch spectacles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSpectacles();
  }, []);


  useEffect(() => {
    const filtered = spectacles.filter((spectacle) => {
      return (
        (!selectedCategory || spectacle.category === selectedCategory) &&
        (!selectedGender || spectacle.gender === selectedGender) &&
        (!selectedPriceRange || checkPriceRange(spectacle.price, selectedPriceRange)) &&
        (!selectedFrameMaterial || spectacle.frameMaterial === selectedFrameMaterial) &&
        (!selectedFrameShape || spectacle.frameShape === selectedFrameShape) &&
        (!selectedColor || spectacle.colors.some(color => color.colorName === selectedColor))
      );
    });
    setFilteredSpectacles(filtered);
  }, [
    selectedCategory,
    selectedGender,
    selectedPriceRange,
    selectedFrameMaterial,
    selectedFrameShape,
    selectedColor, // Add selectedColor to dependencies
    spectacles,
  ]);
  const message = [
    "Discover the Latest Trends: Shop Zoopiceye Collections",
    "Curated Collections for Every Occasion",
    "Your One-Stop Destination for Style & Quality",
    "Sign Up for Exclusive Deals!",
    "Find Your Perfect Fit: Browse Our Collections",
    "New Arrivals: Fresh Styles Every Week",
    "Your Fashion Journey Starts Here: Zoopiceye Collections",
    "Timeless Designs, Modern Styles: Explore Now",
    "Premium Collections at Unbeatable Prices"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % message.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [message.length]);

  const checkPriceRange = (price, range) => {
    if (!range) return true;
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
  };

  return (
    <>

      <div className=" h-6 w-full left-0 right-0 message-container1 z-50">
        <div className="message-text1 text-xl text-center bg-gradient-to-r from-[#eded12] via-[#158392] to-[#e70cd8]  text-transparent bg-clip-text">
          {message[currentMessageIndex]}
        </div>
      </div>
      <div className="pt-20 pl-4 w-full flex flex-col lg:flex-row gap-6 bg-[#f5f9f9]">
        {/* Filters */}
        <div className="w-full lg:w-fit bg-[#eff3f3c6] text-[#278099] p-4 rounded-lg shadow-lg border border-gray-200 h-auto lg:h-[100px] flex flex-col">
          <div className="w-full lg:w-fit bg-gradient-to-b from-[#0fb4bd] to-[#045df8] text-[#fffefee1] p-4 rounded-lg shadow-lg border border-gray-200 h-auto lg:h-[1350px] flex flex-col">
            <h4 className="text-sm lg:text-lg font-bold mb-2">Filter By</h4> {/* Smaller font for mobile */}
            <div className="mb-4"></div>

            {/* Category Filter */}
            <div className="mb-4">
              <h5 className="text-xs lg:text-sm font-semibold mb-1">Category</h5> {/* Smaller font for mobile */}
              <div className="space-y-1">
                {['eyeglasses', 'sunglasses', 'contactlens'].map(category => (
                  <label key={category} className="flex items-center hover:text-[#7ffc46] text-xs lg:text-sm"> {/* Smaller font for mobile */}
                    <input
                      type="radio"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-1"
                    />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="mb-4">
              <h5 className="text-xs lg:text-sm font-semibold mb-1">Gender</h5>
              <div className="space-y-1">
                {['male', 'female', 'kids'].map(gender => (
                  <label key={gender} className="flex items-center hover:text-[#2cf5a1] text-xs lg:text-sm">
                    <input
                      type="radio"
                      value={gender}
                      checked={selectedGender === gender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="mr-1"
                    />
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
              <h5 className="text-xs lg:text-sm font-semibold mb-1">Price</h5>
              <div className="space-y-1">
                {['0-1000', '1000-3000', '3000-5000', '5000-10000'].map(range => (
                  <label key={range} className="flex items-center hover:text-[#1dec24] text-xs lg:text-sm">
                    <input
                      type="radio"
                      value={range}
                      checked={selectedPriceRange === range}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="mr-1"
                    />
                    ₹{range.replace('-', ' - ₹')}
                  </label>
                ))}
              </div>
            </div>

            {/* Frame Material Filter */}
            <div className="mb-4">
              <h5 className="text-xs lg:text-sm font-semibold mb-1">Frame Material</h5>
              <div className="space-y-1">
                {[
                  'Acetate',
                  'Acetate & Alloy Metal',
                  'Alloy Metal',
                  'Alloy Metal & Polycarbonate',
                  'Alloy Metal & TR90',
                  'HD Acetate',
                  'Metal',
                  'Polycarbonate',
                  'TR90',
                  'Ultem'
                ].map(material => (
                  <label key={material} className="flex items-center hover:text-[#5ffc25] text-xs lg:text-sm">
                    <input
                      type="radio"
                      value={material}
                      checked={selectedFrameMaterial === material}
                      onChange={(e) => setSelectedFrameMaterial(e.target.value)}
                      className="mr-1"
                    />
                    {material}
                  </label>
                ))}
              </div>
            </div>

            {/* Frame Shape Filter */}
            <div className="mb-4">
              <h5 className="text-xs lg:text-sm font-semibold mb-1">Frame Shape</h5>
              <div className="space-y-1">
                {[
                  'Butterfly',
                  'Cat Eye',
                  'Flier',
                  'Hexagon',
                  'Oval',
                  'Pentagon',
                  'Rectangular',
                  'Round',
                  'Square'
                ].map(shape => (
                  <label key={shape} className="flex items-center hover:text-[#3bee23] text-xs lg:text-sm">
                    <input
                      type="radio"
                      value={shape}
                      checked={selectedFrameShape === shape}
                      onChange={(e) => setSelectedFrameShape(e.target.value)}
                      className="mr-1"
                    />
                    {shape}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spectacle Cards */}
        <div className="w-full lg:w-4/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 ">
          {filteredSpectacles.length > 0 ? (
            filteredSpectacles.map(spectacle => (
              <SpectacleCard
                key={spectacle._id}
                spectacle={spectacle}
                isSelected={selectedSpectacle === spectacle._id} // Pass selected state
                onSelect={() => setSelectedSpectacle(spectacle._id)} // Set selected spectacle
                className="text-xs lg:text-sm " // Add class for smaller text
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-xs lg:text-sm">No spectacles found.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default SpectacleList;
