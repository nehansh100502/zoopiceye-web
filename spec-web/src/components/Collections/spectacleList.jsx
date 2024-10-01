
// import React, {useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useAuth } from '../../AuthContext';
// import Slider from 'react-slick';

// const SpectacleCard = ({ spectacle }) => {
//   const navigate = useNavigate();
//   const { addToWishlist, removeFromWishlist, wishlist } = useAuth();
//   const [isWishlisted, setIsWishlisted] = useState(
//     !!wishlist.find((item) => item._id === spectacle._id)
//   );

//   const handleShopNow = () => {
//     navigate(`/SpectacleDetail/${spectacle._id}`);
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlisted) {
//       removeFromWishlist(spectacle._id);
//     } else {
//       addToWishlist(spectacle);
//     }
//     setIsWishlisted(!isWishlisted);
//   };

//   // Settings for react-slick slider
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="relative bg-[#eafefe] border border-gray-200 rounded-lg shadow-lg p-4 h-auto w-full transition-transform transform hover:scale-105">
//       {/* Image Slider */}
//       {spectacle.images && spectacle.images.length > 0 ? (
//         <Slider {...settings} className="mb-4">
//           {spectacle.images.map((image, index) => {
//             const finalImageUrl = `http://localhost:4000/uploads/${image.replace('/uploads/', '')}`;
//             return (
//               <div key={index} className="relative">
//                 <img
//                   src={finalImageUrl}
//                   alt={spectacle.name}
//                   className="w-full h-48 object-cover rounded-md"
//                 />
//               </div>
//             );
//           })}
//         </Slider>
//       ) : (
//         <img
//           src={`http://localhost:4000/uploads/default.jpg`} // Default image if no images exist
//           alt={spectacle.name}
//           className="w-full h-48 object-cover rounded-md"
//         />
//       )}

//       <div className="p-2">
//         <h3 className="text-xl font-semibold mb-1 text-gray-800">{spectacle.name}</h3>
//         <p className="text-gray-600 text-sm mb-2 line-clamp-2">{spectacle.description}</p>
//         <div className="flex items-center justify-between mb-2">
//           <p className="text-gray-800 font-bold text-lg">₹{spectacle.price}</p>
//           <p className="text-gray-500 text-sm">Stock: {spectacle.stock}</p>
//         </div>
//         <div className="flex justify-between items-center mb-2">
//           <button
//             onClick={handleWishlistToggle}
//             className="text-red-500 transition-colors duration-300 hover:text-red-600"
//           >
//             {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//           </button>
//           <button
//             onClick={handleShopNow}
//             className="bg-[#1ea1a3] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#2e84a9] transition duration-300"
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// const SpectacleList = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');
// const [selectedGender, setSelectedGender] = useState('');
// const [selectedPriceRange, setSelectedPriceRange] = useState('');
// const [selectedFrameMaterial, setSelectedFrameMaterial] = useState('');
// const [selectedFrameShape, setSelectedFrameShape] = useState('');

//   useEffect(() => {
//     const fetchSpectacles = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/v1/spectacles');
//         if (response.ok) {
//           const data = await response.json();
//           setSpectacles(data);
//         } else {
//           console.error('Failed to fetch spectacles');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchSpectacles();
//   }, []);

//   useEffect(() => {
//     const filtered = spectacles.filter((spectacle) => {
//       return (
//         (!selectedCategory || spectacle.category === selectedCategory) &&
//         (!selectedGender || spectacle.gender === selectedGender) &&
//         (!selectedPriceRange || checkPriceRange(spectacle.price, selectedPriceRange))&&
//         (!selectedFrameMaterial || spectacle.frameMaterial === selectedFrameMaterial) &&
//         (!selectedFrameShape || spectacle.frameShape === selectedFrameShape)
//       );
//     });
//     setFilteredSpectacles(filtered);
//   },[selectedCategory, selectedGender, selectedPriceRange, selectedFrameMaterial, selectedFrameShape, spectacles]);

//   const checkPriceRange = (price, range) => {
//     if (!range) return true;
//     const [min, max] = range.split('-').map(Number);
//     return price >= min && price <= max;
//   };

//   return (
//     <>
//       <div className="pt-28 pl-4 w-full  flex flex-col lg:flex-row gap-6 bg-[#f5f9f9]">
//         {/* Filters */}
//         <div className="w-full lg:w-fit bg-[#259096a1] text-white p-4 rounded-lg shadow-lg border border-gray-200 h-auto lg:h-[500px] flex flex-col">
//           <h4 className="text-lg font-bold mb-4">Filter By</h4>
//           <div className="mb-6">
//         <h5 className="font-semibold mb-2">Category</h5>
//        <div className="space-y-2">
//             <label className="flex items-center hover:text-[#9021d0]">
//               <input
//                   type="radio"
//                   value="eyeglasses"
//                   checked={selectedCategory === 'eyeglasses'}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="mr-2"
//                 />
//                 Eyeglasses
//               </label>
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="sunglasses"
//                   checked={selectedCategory === 'sunglasses'}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="mr-2"
//                 />
//                 Sunglasses
//               </label>
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="contactlens"
//                   checked={selectedCategory === 'contactlens'}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="mr-2"
//                 />
//                 Contact Lens
//               </label>
//             </div>
//           </div>

//           {/* Gender Filter */}
//           <div className="mb-6">
//             <h5 className="font-semibold mb-2">Gender</h5>
//             <div className="space-y-2">
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="male"
//                   checked={selectedGender === 'male'}
//                   onChange={(e) => setSelectedGender(e.target.value)}
//                   className="mr-2"
//                 />
//                 Male
//               </label>
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="female"
//                   checked={selectedGender === 'female'}
//                   onChange={(e) => setSelectedGender(e.target.value)}
//                   className="mr-2"
//                 />
//                 Female
//               </label>
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="kids"
//                   checked={selectedGender === 'kids'}
//                   onChange={(e) => setSelectedGender(e.target.value)}
//                   className="mr-2"
//                 />
//                 Kids
//               </label>
//             </div>
//           </div>

//           {/* Price Filter */}
//           <div className="mb-6">
//             <h5 className="font-semibold mb-2">Price</h5>
//             <div className="space-y-2">
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="500-1000"
//                   checked={selectedPriceRange === '500-1000'}
//                   onChange={(e) => setSelectedPriceRange(e.target.value)}
//                   className="mr-2"
//                 />
//                 ₹500 - ₹1000
//               </label>
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="1000-2000"
//                   checked={selectedPriceRange === '1000-2000'}
//                   onChange={(e) => setSelectedPriceRange(e.target.value)}
//                   className="mr-2"
//                 />
//                 ₹1000 - ₹2000
//               </label>
//               <label className="flex items-center hover:text-[#9021d0]">
//                 <input
//                   type="radio"
//                   value="2000-3000"
//                   checked={selectedPriceRange === '2000-3000'}
//                   onChange={(e) => setSelectedPriceRange(e.target.value)}
//                   className="mr-2"
//                 />
//                 ₹2000 - ₹3000
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="mb-6">
//   <h5 className="font-semibold mb-2">Frame Material</h5>
//   <div className="space-y-2">
//     <label className="flex items-center hover:text-[#9021d0]">
//       <input
//         type="radio"
//         value="Acetate"
//         checked={selectedFrameMaterial === 'Acetate'}
//         onChange={(e) => setSelectedFrameMaterial(e.target.value)}
//         className="mr-2"
//       />
//       Acetate
//     </label>
//     <label className="flex items-center hover:text-[#9021d0]">
//       <input
//         type="radio"
//         value="Alloy Metal"
//         checked={selectedFrameMaterial === 'Alloy Metal'}
//         onChange={(e) => setSelectedFrameMaterial(e.target.value)}
//         className="mr-2"
//       />
//       Alloy Metal
//     </label>
//     <label className="flex items-center hover:text-[#9021d0]">
//       <input
//         type="radio"
//         value="TR90"
//         checked={selectedFrameMaterial === 'TR90'}
//         onChange={(e) => setSelectedFrameMaterial(e.target.value)}
//         className="mr-2"
//       />
//       TR90
//     </label>
//     {/* Add more frame materials here */}
//   </div>
// </div>

// <div className="mb-6">
//   <h5 className="font-semibold mb-2">Frame Shape</h5>
//   <div className="space-y-2">
//     <label className="flex items-center hover:text-[#9021d0]">
//       <input
//         type="radio"
//         value="Butterfly"
//         checked={selectedFrameShape === 'Butterfly'}
//         onChange={(e) => setSelectedFrameShape(e.target.value)}
//         className="mr-2"
//       />
//       Butterfly
//     </label>
//     <label className="flex items-center hover:text-[#9021d0]">
//       <input
//         type="radio"
//         value="Cat Eye"
//         checked={selectedFrameShape === 'Cat Eye'}
//         onChange={(e) => setSelectedFrameShape(e.target.value)}
//         className="mr-2"
//       />
//       Cat Eye
//     </label>
//     <label className="flex items-center hover:text-[#9021d0]">
//       <input
//         type="radio"
//         value="Round"
//         checked={selectedFrameShape === 'Round'}
//         onChange={(e) => setSelectedFrameShape(e.target.value)}
//         className="mr-2"
//       />
//       Round
//     </label>
//     {/* Add more frame shapes here */}
//   </div>
// </div>
// <button
//   onClick={() => {
//     setSelectedCategory('');
//     setSelectedGender('');
//     setSelectedPriceRange('');
//     setSelectedFrameMaterial('');
//     setSelectedFrameShape('');
//   }}
//   className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
// >
//   Clear Filters
// </button>

//         {/* Spectacle Cards */}
//         <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-10">
//           {filteredSpectacles.length > 0 ? (
//             filteredSpectacles.map((spectacle) => (
//               <SpectacleCard key={spectacle._id} spectacle={spectacle} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-600">No spectacles found.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SpectacleList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Slider from 'react-slick';
import { useAuth } from '../../AuthContext';

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
    <div
      onClick={onSelect} // Handle click to select the card
      className={`relative border border-gray-200 rounded-lg shadow-lg p-4 h-auto w-full transition-transform transform hover:scale-105 cursor-pointer ${
        isSelected ? 'bg-blue-100' : 'bg-[#eafefe]'
      }`} // Apply conditional styling based on selection
    >
      {/* Image Slider */}
      {spectacle.images && spectacle.images.length > 0 ? (
        <Slider {...settings} className="mb-4">
          {spectacle.images.map((image, index) => {
            const finalImageUrl = `http://localhost:4000/uploads/${image.replace('/uploads/', '')}`;
            return (
              <div key={index} className="relative">
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
            className="bg-[#1ea1a3] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#2e84a9] transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
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
  

  const checkPriceRange = (price, range) => {
    if (!range) return true;
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
  };

  return (
    <>
      <div className="pt-28 pl-4 w-full flex flex-col lg:flex-row gap-6 bg-[#f5f9f9]">
  {/* Filters */}
  <div className="w-full lg:w-fit bg-[#eff3f3c6] text-[#278099] p-4 rounded-lg shadow-lg border border-gray-200 h-auto lg:h-[100px] flex flex-col">
    <div className="w-full lg:w-fit bg-[#f0f6f6d3] text-[#000000cb] p-4 rounded-lg shadow-lg border border-gray-200 h-auto lg:h-[1350px] flex flex-col">
      <h4 className="text-sm lg:text-lg font-bold mb-2">Filter By</h4> {/* Smaller font for mobile */}
      <div className="mb-4"></div>

      {/* Category Filter */}
      <div className="mb-4">
        <h5 className="text-xs lg:text-sm font-semibold mb-1">Category</h5> {/* Smaller font for mobile */}
        <div className="space-y-1">
          {['eyeglasses', 'sunglasses', 'contactlens'].map(category => (
            <label key={category} className="flex items-center hover:text-[#9021d0] text-xs lg:text-sm"> {/* Smaller font for mobile */}
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
            <label key={gender} className="flex items-center hover:text-[#9021d0] text-xs lg:text-sm">
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
            <label key={range} className="flex items-center hover:text-[#9021d0] text-xs lg:text-sm">
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
            <label key={material} className="flex items-center hover:text-[#9021d0] text-xs lg:text-sm">
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
            <label key={shape} className="flex items-center hover:text-[#9021d0] text-xs lg:text-sm">
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
  <div className="w-full lg:w-4/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
    {filteredSpectacles.length > 0 ? (
      filteredSpectacles.map(spectacle => (
        <SpectacleCard
          key={spectacle._id}
          spectacle={spectacle}
          isSelected={selectedSpectacle === spectacle._id} // Pass selected state
          onSelect={() => setSelectedSpectacle(spectacle._id)} // Set selected spectacle
          className="text-xs lg:text-sm" // Add class for smaller text
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
