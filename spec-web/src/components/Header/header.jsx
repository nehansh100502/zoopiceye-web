// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaRegHeart, FaUserCircle } from "react-icons/fa";
// import { BsCart2, BsFillCollectionFill } from "react-icons/bs";
// import { BiSolidOffer } from "react-icons/bi";
// import { FiMenu, FiX } from 'react-icons/fi';
// import { useAuth } from "../../AuthContext";
// import logo from '../../assets/zoopiceye01.png';
// import './header.css';

// function Header() {
//   const { isLoggedIn, user } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate(); 

//   const messages = [
//     "Free Delivery on Your First 3 Orders!",
//     "Get 20% Off on Your First Order!",
//     "Limited Time Offer: Buy 1 Get 1 Free!",
//     "Sign Up for Exclusive Deals!"
//   ];

//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [messages.length]);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login');
//     }
//   }, [isLoggedIn, navigate]);

//   const isActive = (path) => location.pathname === path;

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const goToProfile = () => {
//     navigate('/profile');
//   };

//   const goToHome = () => {
//     navigate('/');
//   };

//   return (
//     <header className="header fixed top-5 left-0 right-0 z-50 bg-white shadow-md">
//       {/* Message Banner */}
//       <div className="fixed bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] h-6 w-full left-0 right-0 top-0 text-[#181818] message-container">
//         <div className="message-text text-center text-sm md:text-base">
//           {messages[currentMessageIndex]}
//         </div>
//       </div>
//       {/* Navigation Bar */}
//       <nav className="flex justify-between items-center h-20 px-4 md:px-6 relative">
//         {/* Logo */}
//         <Link to="/" onClick={closeMenu} className="flex items-center h-16 md:h-16 p-2">
//           <img src={logo} alt="logo" className="h-32 w-36 object-contain " />
//         </Link>

//         {/* Hamburger Menu Button (For Mobile) */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-black focus:outline-none">
//             {menuOpen ? <FiX className="h-7 w-7" /> : <FiMenu className="h-7 w-7" />}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-6">
//           <Link
//             to="/SpectacleList"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/SpectacleList') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <BsFillCollectionFill className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Collections</span>
//           </Link>

//           <Link
//             to="/Offer"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Offer') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <BiSolidOffer className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Offers</span>
//           </Link>

//           <Link
//             to="/Wishlist"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Wishlist') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <FaRegHeart className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Wishlist</span>
//           </Link>

//           <Link
//             to="/cart"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/cart') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <BsCart2 className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Cart</span>
//           </Link>

//           {/* User Icon */}
//           {isLoggedIn && (
//             <button
//               onClick={goToProfile}
//               className="flex items-center gap-2 text-black hover:text-[#189AB4] text-base transition-all duration-300 focus:outline-none"
//             >
//               <FaUserCircle className="h-6 w-6 md:h-7 md:w-7" />
//               <span>{user?.username || 'User'}</span>
//             </button>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col gap-6 p-6 text-lg">
//             <Link
//               to="/SpectacleList"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <BsFillCollectionFill className="h-5 w-5" />
//               <span>Collections</span>
//             </Link>
//             <Link
//               to="/Offer"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <BiSolidOffer className="h-5 w-5" />
//               <span>Offers</span>
//             </Link>
//             <Link
//               to="/Wishlist"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <FaRegHeart className="h-5 w-5" />
//               <span>Wishlist</span>
//             </Link>
//             <Link
//               to="/cart"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <BsCart2 className="h-5 w-5" />
//               <span>Cart</span>
//             </Link>
//             {isLoggedIn && (
//               <button
//                 onClick={goToProfile}
//                 className="flex items-center gap-2 text-black"
//               >
//                 <FaUserCircle className="h-6 w-6" />
//                 <span>{user?.username || 'User'}</span>
//               </button>
//             )}
//           </div>
//         )}
//          {/* User Profile */}
//          {isLoggedIn && (
//               <button
//                 onClick={goToProfile}
//                 className="block md:inline-flex items-center text-black hover:bg-[#189AB4] py-2 md:py-0 px-3 rounded-md transition-all duration-300 text-sm md:text-base focus:outline-none"
//               >
//                 <FaUserCircle className="inline-block mr-2 h-6 w-6 md:h-7 md:w-7" />
//                 <span>{user?.username || 'User'}</span>
//               </button>
//             )}
//       </nav>
//     </header>
//   );
// }

// export default Header;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaRegHeart, FaUserCircle } from "react-icons/fa";
// import { BsCart2, BsFillCollectionFill } from "react-icons/bs";
// import { BiSolidOffer } from "react-icons/bi";
// import { FiMenu, FiX } from 'react-icons/fi';
// import { useAuth } from "../../AuthContext"; // Assuming useAuth is correctly configured
// import logo from '../../assets/zoopiceye01.png';
// import { FaBlogger } from "react-icons/fa6";
// import './header.css';

// function Header() {
//   const { isLoggedIn, user } = useAuth(); // Ensure these values are coming correctly from AuthContext
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const messages = [
//     "Free Delivery on Your First 3 Orders!",
//     "Get 20% Off on Your First Order!",
//     "Limited Time Offer: Buy 1 Get 1 Free!",
//     "Sign Up for Exclusive Deals!"
//   ];

//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [messages.length]);

//   // Redirect to login page if user is not logged in
//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login');
//     }
//   }, [isLoggedIn, navigate]);

//   const isActive = (path) => location.pathname === path;

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const goToProfile = () => {
//     navigate('/profile');
//   };

//   return (
//     <header className="header fixed top-5 left-0 right-0 z-50 bg-white shadow-md">
//       {/* Message Banner */}
//       <div className="fixed bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] h-6 w-full left-0 right-0 top-0 text-[#181818] message-container">
//         <div className="message-text text-center text-sm md:text-base">
//           {messages[currentMessageIndex]}
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <nav className="flex justify-between items-center h-20 px-4 md:px-6 relative">
//         {/* Logo */}
//         <Link to="/" onClick={closeMenu} className="flex items-center h-16 md:h-16 p-2">
//           <img src={logo} alt="logo" className="h-32 w-36 object-contain" />
//         </Link>

//         {/* Hamburger Menu Button (For Mobile) */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-black focus:outline-none">
//             {menuOpen ? <FiX className="h-7 w-7" /> : <FiMenu className="h-7 w-7" />}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-6">
//           <Link
//             to="/SpectacleList"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/SpectacleList') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <BsFillCollectionFill className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Collections</span>
//           </Link>

//           <Link
//             to="/Blog"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Offer') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <FaBlogger className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Blog</span>
//           </Link>

//           <Link
//             to="/Wishlist"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Wishlist') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <FaRegHeart className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Wishlist</span>
//           </Link>

//           <Link
//             to="/cart"
//             className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/cart') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
//           >
//             <BsCart2 className="h-5 w-5 md:h-6 md:w-6" />
//             <span>Cart</span>
//           </Link>

//           {/* User Icon */}
//           {isLoggedIn ? (
//             <button
//               onClick={goToProfile}
//               className="flex items-center gap-2 text-black hover:text-[#189AB4] text-base transition-all duration-300 focus:outline-none"
//             >
//               <FaUserCircle className="h-6 w-6 md:h-7 md:w-7" />
//               <span>{user?.username || 'User'}</span>
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               className="text-base text-black hover:text-[#189AB4] transition-all duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col gap-6 p-6 text-lg">
//             <Link
//               to="/SpectacleList"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <BsFillCollectionFill className="h-5 w-5" />
//               <span>Collections</span>
//             </Link>
//             <Link
//               to="/Blog"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <FaBlogger className="h-5 w-5" />
//               <span>Blog</span>
//             </Link>
//             <Link
//               to="/Wishlist"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <FaRegHeart className="h-5 w-5" />
//               <span>Wishlist</span>
//             </Link>
//             <Link
//               to="/cart"
//               className="flex items-center gap-2"
//               onClick={closeMenu}
//             >
//               <BsCart2 className="h-5 w-5" />
//               <span>Cart</span>
//             </Link>

//             {/* User Profile */}
//             {isLoggedIn ? (
//               <button
//                 onClick={goToProfile}
//                 className="flex items-center gap-2 text-black"
//               >
//                 <FaUserCircle className="h-6 w-6" />
//                 <span>{user?.username || 'User'}</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="text-base text-black hover:text-[#189AB4] transition-all duration-300"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { BsCart2, BsFillCollectionFill } from "react-icons/bs";
import { FaBlogger, } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from "../../AuthContext"; // Assuming useAuth is correctly configured
import logo from '../../assets/zoopiceye01.png';
import './header.css';

function Header() {
  const { isLoggedIn, user } = useAuth(); // Ensure these values are coming correctly from AuthContext
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const messages = [
    "Free Delivery on Your First 3 Orders!",
    "Get 20% Off on Your First Order!",
    "Limited Time Offer: Buy 1 Get 1 Free!",
    "Sign Up for Exclusive Deals!"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [messages.length]);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToProfile = () => {
    closeMenu();  // Close the menu before navigating
    navigate('/profile');
  };

  return (
    <header className="header fixed top-5 left-0 right-0 z-50 bg-white shadow-md">
      {/* Message Banner */}
      <div className="fixed bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] h-6 w-full left-0 right-0 top-0 text-[#181818] message-container">
        <div className="message-text text-center text-sm md:text-base">
          {messages[currentMessageIndex]}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center h-20 px-4 md:px-6 relative">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center h-16 md:h-16 p-2">
          <img src={logo} alt="logo" className="h-32 w-36 object-contain" />
        </Link>

        {/* Hamburger Menu Button (For Mobile) */}
        <div className="md:hidden ">
          <button onClick={toggleMenu} className="text-black focus:outline-none ">
            {menuOpen ? <FiX className="h-7 w-7 " /> : <FiMenu className="h-7 w-7" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 ">
        <Link
            to="/"
            className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Blog') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
          >
            {/* <FaHome className="h-5 w-5 md:h-6 md:w-6" /> */}
            <span>Home</span>
          </Link>
          <Link
            to="/SpectacleList"
            className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/SpectacleList') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
          >
            {/* <BsFillCollectionFill className="h-5 w-5 md:h-6 md:w-6" /> */}
            <span>Store</span>
          </Link>

          <Link
            to="/Blog"
            className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Blog') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
          >
            {/* <FaBlogger className="h-5 w-5 md:h-6 md:w-6" /> */}
            <span>Blog</span>
          </Link>

          <Link
            to="/Wishlist"
            className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/Wishlist') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
          >
            {/* <FaRegHeart className="h-5 w-5 md:h-6 md:w-6" /> */}
            <span>Wishlist</span>
          </Link>

          <Link
            to="/cart"
            className={`flex items-center gap-2 text-base transition-all duration-300 ${isActive('/cart') ? 'text-orange-800' : 'hover:text-[#189AB4]'}`}
          >
            {/* <BsCart2 className="h-5 w-5 md:h-6 md:w-6" /> */}
            <span>Cart</span>
          </Link>

          {/* User Icon */}
          {isLoggedIn ? (
            <button
              onClick={goToProfile}
              className="flex items-center gap-2 text-black hover:text-[#189AB4] text-base transition-all duration-300 focus:outline-none"
            >
              <FaUserCircle className="h-6 w-6 md:h-7 md:w-7" />
              <span>{ 'My Account'}</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-base text-black hover:text-[#189AB4] transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed text-[#dddddd] inset-0 bg-gradient-to-b from-[#0f90c3] to-[#06275f] z-40 flex flex-col gap-6 p-6 text-lg hover:translate-x-2">

            <div>
              <h2 className='font-semibold text-xl text-[#2edcfb] p-3'>ZoopicEye Menu</h2>
            </div>
            <Link
            to="/"
            className={`flex items-center gap-2 text-base transition-all duration-300  `}
            onClick={closeMenu}
          >
            <FaHome className="h-5 w-5 md:h-6 md:w-6" />
            <span className='hover:translate-x-2'>Home</span>
          </Link>
            <Link
              to="/SpectacleList"
              className="flex items-center gap-2 "
              onClick={closeMenu}
            >

              <BsFillCollectionFill className="h-5 w-5" />
              <span className='hover:translate-x-2'>Collections</span>
            </Link>
            <Link
              to="/Blog"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <FaBlogger className="h-5 w-5" />
              <span className='hover:translate-x-2'>Blog</span>
            </Link>
            <Link
              to="/Wishlist"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <FaRegHeart className="h-5 w-5" />
              <span className='hover:translate-x-2'>Wishlist</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <BsCart2 className="h-5 w-5" />
              <span className='hover:translate-x-2'>Cart</span>
            </Link>

            {/* User Profile */}
         
        {isLoggedIn ? (
            <button
                onClick={goToProfile}
                className="flex items-center gap-2 text-[white] hover:text-[#189AB4] text-base transition-all duration-300 focus:outline-none"
            >
                <FaUserCircle className="h-6 w-6 md:h-7 md:w-7" />
                <span className='hover:translate-x-2'>{'My Account'}</span> 
            </button>
        ) : (
          <Link
          to="/login"
          className="text-base text-black hover:text-[#189AB4] transition-all duration-300 "
          onClick={closeMenu} // This should close the menu when clicked
        >
          Login
        </Link>
        
        )}
         <div>
           <hr className='h-1 w-full bg-gradient-to-r from-[#359fd4] to-[#1ea7b4] mt-14'/>
            <h2 className='font-semibold text-xl text-[#7719cf] p-3'></h2>
           
            </div>
          </div>
        )}
        
      </nav>
    </header>
  );
}

export default Header;

