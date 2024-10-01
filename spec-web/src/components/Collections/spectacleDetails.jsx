
// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import './slider.css'; 
// // import Slider from 'react-slick';
// // import { useAuth } from '../../AuthContext';
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import { FaHeart, FaRegHeart } from 'react-icons/fa';

// // // Custom Arrow Component for the Slider
// // const CustomArrow = ({ onClick, direction }) => (
// //   <div className={`slick-arrow slick-${direction}`} onClick={onClick}>
// //     <i className={`fas fa-chevron-${direction === 'next' ? 'right' : 'left'}`}></i>
// //   </div>
// // );

// // const SpectacleDetail = () => {
// //   const { id } = useParams();
// //   const [spectacle, setSpectacle] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const navigate = useNavigate();
// //   const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
// //   const [isWishlisted, setIsWishlisted] = useState(false);

// //   useEffect(() => {
// //     const fetchSpectacle = async () => {
// //       try {
// //         const response = await fetch(`http://localhost:4000/api/v1/spectacles/${id}`);
// //         if (response.ok) {
// //           const data = await response.json();
// //           setSpectacle(data);
// //           setIsWishlisted(!!wishlist.find((item) => item._id === data._id));
// //         } else {
// //           console.error('Failed to fetch spectacle details');
// //         }
// //       } catch (error) {
// //         console.error('Error:', error);
// //       }
// //     };

// //     fetchSpectacle();
// //   }, [id, wishlist]);

// //   const handleGoToCheckout = () => {
// //     navigate(`/checkout`);
// //   };

// //   const handleAddToCart = () => {
// //     addToCart({ ...spectacle, quantity });
// //   };

// //   const handleIncreaseQuantity = () => {
// //     setQuantity(prevQuantity => prevQuantity + 1);
// //   };

// //   const handleDecreaseQuantity = () => {
// //     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
// //   };

// //   const handleWishlistToggle = () => {
// //     if (isWishlisted) {
// //       removeFromWishlist(spectacle._id);
// //     } else {
// //       addToWishlist(spectacle);
// //     }
// //     setIsWishlisted(!isWishlisted);
// //   };

// //   if (!spectacle) {
// //     return <div>Loading...</div>;
// //   }

// //   const totalPrice = quantity * spectacle.price;

// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     nextArrow: <CustomArrow direction="next" />,
// //     prevArrow: <CustomArrow direction="prev" />,
// //   };

// //   return (
// //     <div className="h-auto w-full bg-[#abeffe] p-24">
// //       <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row mt-20">
// //         {/* Image Side */}
// //         <div className="w-full md:w-1/2 p-6">
// //           <Slider {...settings} className="mb-2">
// //             {spectacle.images && spectacle.images.length > 0 ? (
// //               spectacle.images.map((image, index) => (
// //                 <div key={index}>
// //                   <img
// //                     src={`http://localhost:4000${image}`}
// //                     alt={spectacle.name}
// //                     className="w-full h-80 object-cover rounded-md"
// //                   />
// //                 </div>
// //               ))
// //             ) : (
// //               <img
// //                 src={`http://localhost:4000/uploads/default.jpg`}
// //                 alt="Default"
// //                 className="w-full h-80 object-cover rounded-md"
// //               />
// //             )}
// //           </Slider>
// //         </div>

// //         {/* Details Side */}
// //         <div className="w-full md:w-1/2 p-6">
// //           <h2 className="text-2xl font-semibold flex justify-between items-center">
// //             {spectacle.name}
// //             <button onClick={handleWishlistToggle} className="text-red-500">
// //               {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
// //             </button>
// //           </h2>
// //           <p className="text-gray-600 mt-2 ">{spectacle.description}</p>
// //           <p className="text-gray-800 font-bold mt-2 ">₹{totalPrice}</p>
// //           <p className="text-gray-600 mt-1 ">Category: {spectacle.category}</p>
// //           <p className="text-gray-600 mt-1 ">Gender: {spectacle.gender}</p>
// //           <p className="text-gray-600 mt-1 ">{spectacle.sku}</p>
// //           <p className="text-gray-600 mt-1 ">Material: {spectacle.frameMaterial}</p>
// //           <p className="text-gray-600 mt-1 ">Shape: {spectacle.frameShape}</p>
// //           <p className=" mt-1 text-[green] font-bold"> {spectacle.discount}% OFF</p>

// //           {/* Quantity Selector */}

// //           <div className="flex items-center mt-4">
// //             <button
// //               onClick={handleDecreaseQuantity}
// //               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300 focus:outline-none"
// //             >
// //               -
// //             </button>
// //             <span className="px-4 text-lg">{quantity}</span>
// //             <button
// //               onClick={handleIncreaseQuantity}
// //               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300 focus:outline-none"
// //             >
// //               +
// //             </button>
// //           </div>

// //           {/* Add to Cart */}
// //           <button
// //             onClick={handleAddToCart}
// //             className="w-full bg-[#b82f0d] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#fd4c4c] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
// //           >
// //             Add to Cart
// //           </button>

// //           {/* Go to Checkout */}
// //           <button
// //             onClick={handleGoToCheckout}
// //             className="w-full bg-[#109ea8] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mt-4"
// //           >
// //             Go to Checkout
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpectacleDetail;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './slider.css'; 
// import Slider from 'react-slick';
// import { useAuth } from '../../AuthContext';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const SpectacleDetail = () => {
//   const { id } = useParams();
//   const [spectacle, setSpectacle] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(null); // Add selectedColor state
//   const [isColorAvailable, setIsColorAvailable] = useState(true); // State to track color availability
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     const fetchSpectacle = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/v1/spectacles/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSpectacle(data);
//           setIsWishlisted(!!wishlist.find((item) => item._id === data._id));
//         } else {
//           console.error('Failed to fetch spectacle details');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchSpectacle();
//   }, [id, wishlist]);

//   const handleGoToCheckout = () => {
//     if (selectedColor && isColorAvailable) {
//       navigate(`/checkout`);
//     } else {
//       alert('Please select a valid color before proceeding to checkout.');
//     }
//   };

//   const handleAddToCart = () => {
//     if (selectedColor && isColorAvailable) {
//       addToCart({ ...spectacle, quantity, selectedColor });
//     } else {
//       alert('Selected color is not available.');
//     }
//   };

//   const handleIncreaseQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlisted) {
//       removeFromWishlist(spectacle._id);
//     } else {
//       addToWishlist(spectacle);
//     }
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleColorSelect = (color) => {
//     setSelectedColor(color.colorName);
//     setIsColorAvailable(color.stock > 0); // Check if the color is in stock
//   };

//   if (!spectacle) {
//     return <div>Loading...</div>;
//   }

//   const totalPrice = quantity * spectacle.price;

//   return (
//     <div className="h-auto w-full bg-[#abeffe] p-24">
//       <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row mt-20">
//         <div className="w-full md:w-1/2 p-6">
//           <Slider>
//             {spectacle.images && spectacle.images.length > 0 ? (
//               spectacle.images.map((image, index) => (
//                 <div key={index}>
//                   <img
//                     src={`http://localhost:4000${image}`}
//                     alt={spectacle.name}
//                     className="w-full h-80 object-cover rounded-md"
//                   />
//                 </div>
//               ))
//             ) : (
//               <img
//                 src={`http://localhost:4000/uploads/default.jpg`}
//                 alt="Default"
//                 className="w-full h-80 object-cover rounded-md"
//               />
//             )}
//           </Slider>
//         </div>

//         <div className="w-full md:w-1/2 p-6">
//           <h2 className="text-2xl font-semibold flex justify-between items-center">
//             {spectacle.name}
//             <button onClick={handleWishlistToggle} className="text-red-500">
//               {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//             </button>
//           </h2>
//           <p className="text-gray-600 mt-2 ">{spectacle.description}</p>
//           <p className="text-gray-800 font-bold mt-2 ">₹{totalPrice}</p>

//           <p className="text-gray-600 mt-1 ">Category: {spectacle.category}</p>
//           <p className="text-gray-600 mt-1 ">Gender: {spectacle.gender}</p>
//           <p className="text-gray-600 mt-1 ">{spectacle.sku}</p>

//           <div className="flex items-center mt-4">
//             <p className="text-gray-600 mt-1">Available Colors:</p>
//             <div className="flex space-x-2 ml-4">
//               {spectacle.colors.map((color, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleColorSelect(color)}
//                   className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
//                     selectedColor === color.colorName ? 'border-black' : 'border-transparent'
//                   }`}
//                   style={{ backgroundColor: color.colorName.toLowerCase() }}
//                   title={color.colorName}
//                 />
//               ))}
//             </div>
//           </div>

//           {!isColorAvailable && (
//             <p className="text-red-600 mt-2">Selected color is not available</p>
//           )}

//           {/* Quantity Selector */}
//           <div className="flex items-center mt-4">
//             <button
//               onClick={handleDecreaseQuantity}
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300 focus:outline-none"
//             >
//               -
//             </button>
//             <span className="px-4 text-lg">{quantity}</span>
//             <button
//               onClick={handleIncreaseQuantity}
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300 focus:outline-none"
//             >
//               +
//             </button>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-[#b82f0d] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#fd4c4c] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
//           >
//             Add to Cart
//           </button>

//           <button
//             onClick={handleGoToCheckout}
//             className="w-full bg-[#109ea8] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mt-4"
//           >
//             Go to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpectacleDetail;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './slider.css'; 
// import Slider from 'react-slick';
// import { useAuth } from '../../AuthContext';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// // Custom Arrow Component for the Slider
// const CustomArrow = ({ onClick, direction }) => (
//   <div className={`slick-arrow slick-${direction}`} onClick={onClick}>
//     <i className={`fas fa-chevron-${direction === 'next' ? 'right' : 'left'}`}></i>
//   </div>
// );

// const SpectacleDetail = () => {
//   const { id } = useParams();
//   const [spectacle, setSpectacle] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     const fetchSpectacle = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/v1/spectacles/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSpectacle(data);
//           setIsWishlisted(!!wishlist.find((item) => item._id === data._id));
//         } else {
//           console.error('Failed to fetch spectacle details');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchSpectacle();
//   }, [id, wishlist]);

//   const handleGoToCheckout = () => {
//     navigate(`/checkout`);
//   };

//   const handleAddToCart = () => {
//     addToCart({ ...spectacle, quantity });
//   };

//   const handleIncreaseQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlisted) {
//       removeFromWishlist(spectacle._id);
//     } else {
//       addToWishlist(spectacle);
//     }
//     setIsWishlisted(!isWishlisted);
//   };

//   if (!spectacle) {
//     return <div>Loading...</div>;
//   }

//   const totalPrice = quantity * spectacle.price;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <CustomArrow direction="next" />,
//     prevArrow: <CustomArrow direction="prev" />,
//   };

//   return (
//     <div className="h-auto w-full bg-[#abeffe] p-24">
//       <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row mt-20">
//         {/* Image Side */}
//         <div className="w-full md:w-1/2 p-6">
//           <Slider {...settings} className="mb-2">
//             {spectacle.images && spectacle.images.length > 0 ? (
//               spectacle.images.map((image, index) => (
//                 <div key={index}>
//                   <img
//                     src={`http://localhost:4000${image}`}
//                     alt={spectacle.name}
//                     className="w-full h-80 object-cover rounded-md"
//                   />
//                 </div>
//               ))
//             ) : (
//               <img
//                 src={`http://localhost:4000/uploads/default.jpg`}
//                 alt="Default"
//                 className="w-full h-80 object-cover rounded-md"
//               />
//             )}
//           </Slider>
//         </div>

//         {/* Details Side */}
//         <div className="w-full md:w-1/2 p-6">
//           <h2 className="text-2xl font-semibold flex justify-between items-center">
//             {spectacle.name}
//             <button onClick={handleWishlistToggle} className="text-red-500">
//               {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//             </button>
//           </h2>
//           <p className="text-gray-600 mt-2 ">{spectacle.description}</p>
//           <p className="text-gray-800 font-bold mt-2 ">₹{totalPrice}</p>
//           <p className="text-gray-600 mt-1 ">Category: {spectacle.category}</p>
//           <p className="text-gray-600 mt-1 ">Gender: {spectacle.gender}</p>
//           <p className="text-gray-600 mt-1 ">{spectacle.sku}</p>
//           <p className="text-gray-600 mt-1 ">Material: {spectacle.frameMaterial}</p>
//           <p className="text-gray-600 mt-1 ">Shape: {spectacle.frameShape}</p>
//           <p className=" mt-1 text-[green] font-bold"> {spectacle.discount}% OFF</p>

//           {/* Quantity Selector */}

//           <div className="flex items-center mt-4">
//             <button
//               onClick={handleDecreaseQuantity}
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300 focus:outline-none"
//             >
//               -
//             </button>
//             <span className="px-4 text-lg">{quantity}</span>
//             <button
//               onClick={handleIncreaseQuantity}
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300 focus:outline-none"
//             >
//               +
//             </button>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-[#b82f0d] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#fd4c4c] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
//           >
//             Add to Cart
//           </button>

//           {/* Go to Checkout */}
//           <button
//             onClick={handleGoToCheckout}
//             className="w-full bg-[#109ea8] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mt-4"
//           >
//             Go to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpectacleDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './slider.css'; 
// import Slider from 'react-slick';
// import { useAuth } from '../../AuthContext';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const SpectacleDetail = () => {
//   const { id } = useParams();
//   const [spectacle, setSpectacle] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(null); // Add selectedColor state
//   const [isColorAvailable, setIsColorAvailable] = useState(true); // State to track color availability
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     const fetchSpectacle = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/v1/spectacles/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSpectacle(data);
//           setIsWishlisted(!!wishlist.find((item) => item._id === data._id));
//         } else {
//           console.error('Failed to fetch spectacle details');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchSpectacle();
//   }, [id, wishlist]);

//   const handleGoToCheckout = () => {
//     if (selectedColor && isColorAvailable) {
//       navigate(`/checkout`);
//     } else {
//       alert('Please select a valid color before proceeding to checkout.');
//     }
//   };

//   const handleAddToCart = () => {
//     if (selectedColor && isColorAvailable) {
//       addToCart({ ...spectacle, quantity, selectedColor });
//     } else {
//       alert('Selected color is not available.');
//     }
//   };

//   const handleIncreaseQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlisted) {
//       removeFromWishlist(spectacle._id);
//     } else {
//       addToWishlist(spectacle);
//     }
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleColorChange = (color) => {
//     setSelectedColor(color); // Update selectedColor state
//     const availableColor = spectacle.colors.find((c) => c === color); // Check color availability
//     setIsColorAvailable(!!availableColor);
//   };

//   if (!spectacle) {
//     return <div>Loading...</div>;
//   }

//   const totalPrice = quantity * spectacle.price;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="h-auto w-full bg-[#abeffe] p-24">
//       <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row mt-20">
//         {/* Image Side */}
//         <div className="w-full md:w-1/2 p-6">
//           <Slider {...settings} className="mb-2">
//             {spectacle.images && spectacle.images.length > 0 ? (
//               spectacle.images.map((image, index) => (
//                 <div key={index}>
//                   <img
//                     src={`http://localhost:4000${image}`}
//                     alt={spectacle.name}
//                     className="w-full h-80 object-cover rounded-md"
//                   />
//                 </div>
//               ))
//             ) : (
//               <img
//                 src={`http://localhost:4000/uploads/default.jpg`}
//                 alt="Default"
//                 className="w-full h-80 object-cover rounded-md"
//               />
//             )}
//           </Slider>
//         </div>

//         {/* Details Side */}
//         <div className="w-full md:w-1/2 p-6">
//           <h2 className="text-2xl font-semibold flex justify-between items-center">
//             {spectacle.name}
//             <button onClick={handleWishlistToggle} className="text-red-500">
//               {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//             </button>
//           </h2>
//           <p className="text-gray-600 mt-2 ">{spectacle.description}</p>
//           <p className="text-gray-800 font-bold mt-2 ">₹{totalPrice}</p>
//           <p className="text-gray-600 mt-1 ">Category: {spectacle.category}</p>
//           <p className="text-gray-600 mt-1 ">Gender: {spectacle.gender}</p>
//           <p className="text-gray-600 mt-1 ">{spectacle.sku}</p>
//           <p className="text-gray-600 mt-1 ">Material: {spectacle.frameMaterial}</p>
//           <p className="text-gray-600 mt-1 ">Shape: {spectacle.frameShape}</p>
//           <p className=" mt-1 text-[green] font-bold"> {spectacle.discount}% OFF</p>

//           {/* Color Selector */}
//           <div className="mt-4">
//             <h4 className="text-lg font-semibold"></h4>
//             <div className="flex space-x-2 mt-2">
//               {spectacle.colors && spectacle.colors.map((color, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleColorChange(color)}
//                   className={`w-8 h-8 rounded-full`}
//                   style={{ backgroundColor: color }}
//                 >
//                   {selectedColor === color && <span className="text-white">✓</span>}
//                 </button>
//               ))}
//             </div>
//             {!isColorAvailable && <p className="text-red-500 mt-2">Selected color is not available.</p>}
//           </div>

//             {/* Color Filter */}
// <div className="mb-6">
//   <h5 className="font-semibold mb-2">Color</h5>
//   <div className="flex flex-wrap space-x-2">
//     {['Red', 'Green', 'Blue', 'Black', 'White'].map((color) => (
//       <label key={color} className="flex items-center hover:text-[#9021d0]">
//         <input
//           type="radio"
//           value={color}
//           checked={selectedColor === color}
//           onChange={(e) => setSelectedColor(e.target.value)}
//           className="mr-2"
//         />
//         <span className={`w-6 h-6 rounded-full`} style={{ backgroundColor: color.toLowerCase() }} />
//         {color}
//       </label>
//     ))}
//   </div>
// </div>


//           {/* Quantity Selector */}
//           <div className="flex items-center mt-4">
//             <button
//               onClick={handleDecreaseQuantity}
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300 focus:outline-none"
//             >
//               -
//             </button>
//             <span className="px-4 text-lg">{quantity}</span>
//             <button
//               onClick={handleIncreaseQuantity}
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300 focus:outline-none"
//             >
//               +
//             </button>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-[#b82f0d] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#fd4c4c] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
//           >
//             Add to Cart
//           </button>

//           {/* Go to Checkout */}
//           <button
//             onClick={handleGoToCheckout}
//             className="w-full bg-[#109ea8] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mt-4"
//           >
//             Go to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpectacleDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './slider.css'; 
// import Slider from 'react-slick';
// import { useAuth } from '../../AuthContext';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaHeart, FaRegHeart } from 'react-icons/fa';


// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full shadow-lg p-2 cursor-pointer"
//       onClick={onClick}
//     >
//       &lt; {/* You can replace this with an icon */}
//     </div>
//   );
// };

// const SampleNextArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1a89a8b8] rounded-full shadow-lg p-2 cursor-pointer"
//       onClick={onClick}
//     >
//       &gt; {/* You can replace this with an icon */}
//     </div>
//   );
// };

// const SpectacleDetail = () => {
//   const { id } = useParams();
//   const [spectacle, setSpectacle] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [isColorAvailable, setIsColorAvailable] = useState(true);
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     const fetchSpectacle = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/v1/spectacles/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSpectacle(data);
//           setIsWishlisted(!!wishlist.find((item) => item._id === data._id));
//         } else {
//           console.error('Failed to fetch spectacle details');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchSpectacle();
//   }, [id, wishlist]);

//   const handleGoToCheckout = () => {
//     if (selectedColor && isColorAvailable) {
//       navigate(`/checkout`);
//     } else {
//       alert('Please select a valid color before proceeding to checkout.');
//     }
//   };

//   const handleAddToCart = () => {
//     if (selectedColor && isColorAvailable) {
//       addToCart({ ...spectacle, quantity, selectedColor });
//     } else {
//       alert('Selected color is not available.');
//     }
//   };

//   const handleIncreaseQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlisted) {
//       removeFromWishlist(spectacle._id);
//     } else {
//       addToWishlist(spectacle);
//     }
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     const availableColor = spectacle.colors.find((c) => c === color);
//     setIsColorAvailable(!!availableColor);
//   };

//   if (!spectacle) {
//     return <div>Loading...</div>;
//   }

//   const totalPrice = quantity * spectacle.price;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     prevArrow: <SamplePrevArrow />,
//     nextArrow: <SampleNextArrow />,
//   };

//   return (
//    <>
//    <div className="h-auto w-full bg-gradient-to-r from-[#4db4e7] to-[#a5f0f7]  p-4 md:p-2">
//   <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row mt-20">
//     {/* Image Side */}
//     <div className="w-full p-6 md:w-1/2">
//       <Slider {...settings} className="mb-2">
//         {spectacle.images && spectacle.images.length > 0 ? (
//           spectacle.images.map((image, index) => (
//             <div key={index}>
//               <img
//                 src={`http://localhost:4000${image}`}
//                 alt={spectacle.name}
//                 className="w-full h-96 object-cover rounded-md"
//               />
//             </div>
//           ))
//         ) : (
//           <img
//             src={`http://localhost:4000/uploads/default.jpg`}
//             alt="Default"
//             className="w-full h-96 object-cover rounded-md"
//           />
//         )}
//       </Slider>
//     </div>

//     {/* Details Side */}
//     <div className="w-full p-6 md:w-1/2">
//       <h2 className="text-xl md:text-2xl font-semibold flex justify-between items-center">
//         {spectacle.name}
//         <button onClick={handleWishlistToggle} className="text-red-500">
//           {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//         </button>
//       </h2>
//       <p className="text-gray-600 mt-2 text-sm md:text-base">{spectacle.description}</p>
//       <p className="text-gray-800 font-bold mt-2 text-lg">₹{totalPrice}</p>
//       <p className="text-gray-600 mt-1 text-sm md:text-base">Category: {spectacle.category}</p>
//       <p className="text-gray-600 mt-1 text-sm md:text-base">Gender: {spectacle.gender}</p>
//       <p className="text-gray-600 mt-1 text-sm md:text-base">{spectacle.sku}</p>
//       <p className="text-gray-600 mt-1 text-sm md:text-base">Material: {spectacle.frameMaterial}</p>
//       <p className="text-gray-600 mt-1 text-sm md:text-base">Shape: {spectacle.frameShape}</p>
//       <p className="mt-1 text-[green] font-bold text-sm md:text-base">{spectacle.discount}% OFF</p>

//       {/* Color Selector */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold">Select Color:</h4>
//         <div className="flex space-x-2 mt-2">
//           {spectacle.colors && spectacle.colors.map((color) => (
//             <button
//               key={color._id} // Use color ID as the key
//               onClick={() => handleColorChange(color)}
//               className={`w-8 h-8 rounded-full border-2 ${selectedColor && selectedColor.colorName === color.colorName ? 'border-blue-500' : 'border-transparent'}`}
//               style={{ backgroundColor: color.colorCode }} // Use colorCode for background
//             >
//               {selectedColor && selectedColor.colorName === color.colorName && <span className="text-white">✓</span>}
//             </button>
//           ))}
//         </div>
//         {!isColorAvailable && <p className="text-red-500 mt-2">Selected color is not available.</p>}
//       </div>

//       {/* Quantity Selector */}
//       <div className="flex items-center mt-4">
//         <button
//           onClick={handleDecreaseQuantity}
//           className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300 focus:outline-none"
//         >
//           -
//         </button>
//         <span className="px-4 text-lg">{quantity}</span>
//         <button
//           onClick={handleIncreaseQuantity}
//           className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300 focus:outline-none"
//         >
//           +
//         </button>
//       </div>

//       {/* Add to Cart */}
//       <button
//         onClick={handleAddToCart}
//         className="w-full bg-[#b82f0d] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#fd4c4c] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
//       >
//         Add to Cart
//       </button>

//       {/* Go to Checkout */}
//       <button
//         onClick={handleGoToCheckout}
//         className="w-full bg-[#109ea8] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mt-4"
//       >
//         Go to Checkout
//       </button>
//     </div>
//   </div>
// </div>

//    </>
//   );
// };

// export default SpectacleDetail;






import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './slider.css';
import Slider from 'react-slick';
import { useAuth } from '../../AuthContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full shadow-lg p-2 cursor-pointer"
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1a89a8b8] rounded-full shadow-lg p-2 cursor-pointer"
      onClick={onClick}
    >
      &gt;
    </div>
  );
};

const SpectacleDetail = () => {
  const { id } = useParams();
  const [spectacle, setSpectacle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColorAvailable, setIsColorAvailable] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if item is added to cart
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchSpectacle = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/spectacles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSpectacle(data);
          setIsWishlisted(!!wishlist.find((item) => item._id === data._id));
        } else {
          console.error('Failed to fetch spectacle details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSpectacle();
  }, [id, wishlist]);

  const handleGoToCheckout = () => {
    if (isAddedToCart) {
      navigate(`/checkout`);
    } else {
      alert('Please add an item to the cart before proceeding to checkout.');
    }
  };

  const handleAddToCart = () => {
    if (selectedColor && isColorAvailable) {
      addToCart({ ...spectacle, quantity, selectedColor });
      setIsAddedToCart(true); // Set added to cart status
    } else {
      alert('Selected color is not available or not selected.');
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(spectacle._id);
    } else {
      addToWishlist(spectacle);
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const availableColor = spectacle.colors.find((c) => c === color);
    setIsColorAvailable(!!availableColor);
  };

  if (!spectacle) {
    return <div>Loading...</div>;
  }

  const totalPrice = quantity * spectacle.price;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <>
      <div className="h-auto w-full bg-gradient-to-r from-[#4db4e7] to-[#a5f0f7] p-4 md:p-2">
        <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row mt-20">
          {/* Image Side */}
          <div className="w-full p-6 md:w-1/2">
            <Slider {...settings} className="mb-2">
              {spectacle.images && spectacle.images.length > 0 ? (
                spectacle.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:4000${image}`}
                      alt={spectacle.name}
                      className="w-full h-96 object-cover rounded-md"
                    />
                  </div>
                ))
              ) : (
                <img
                  src={`http://localhost:4000/uploads/default.jpg`}
                  alt="Default"
                  className="w-full h-96 object-cover rounded-md"
                />
              )}
            </Slider>
          </div>

          {/* Details Side */}
          <div className="w-full p-6 md:w-1/2">
            <h2 className="text-xl md:text-2xl font-semibold flex justify-between items-center">
              {spectacle.name}
              <button onClick={handleWishlistToggle} className="text-red-500">
                {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">{spectacle.description}</p>
            <p className="text-gray-800 font-bold mt-2 text-lg">₹{totalPrice}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Category: {spectacle.category}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Gender: {spectacle.gender}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{spectacle.sku}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Material: {spectacle.frameMaterial}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Shape: {spectacle.frameShape}</p>
            <p className="mt-1 text-[green] font-bold text-sm md:text-base">{spectacle.discount}% OFF</p>

            {/* Color Selector */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Select Color:</h4>
              <div className="flex space-x-2 mt-2">
                {spectacle.colors && spectacle.colors.map((color) => (
                  <button
                    key={color._id} // Use color ID as the key
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor && selectedColor.colorName === color.colorName ? 'border-blue-500' : 'border-transparent'}`}
                    style={{ backgroundColor: color.colorCode }} // Use colorCode for background
                  >
                    {selectedColor && selectedColor.colorName === color.colorName && <span className="text-white">✓</span>}
                  </button>
                ))}
              </div>
              {!isColorAvailable && <p className="text-red-500 mt-2">Selected color is not available.</p>}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mt-4">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300 focus:outline-none"
              >
                -
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300 focus:outline-none"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#b82f0d] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#fd4c4c] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
            >
              Add to Cart
            </button>

            {/* Go to Checkout */}
            <button
              onClick={handleGoToCheckout}
              className={`w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 mt-4 ${isAddedToCart ? 'bg-[#109ea8] text-white hover:bg-green-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
              disabled={!isAddedToCart} // Disable button if not added to cart
            >
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpectacleDetail;
