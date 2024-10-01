import React from 'react';
import logo from '../../assets/zoopiceye01.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-[#f8fbf8] cursor-pointer">
        {/* Container for the footer */}
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            {/* Logo Section */}
            <div className="mb-8 md:mb-0 flex flex-col items-center">
              <img src={logo} alt="logo" className="h-32 w-32 md:h-48 md:w-48 mb-4" />
              <h2 className="text-xl font-bold text-center">Zoopiceye Eyewear</h2>
            </div>

            {/* Company Details Section */}
            <div className="flex flex-col text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-lg font-semibold mb-4">Company Details</h2>
              <p>zoopiceye Eyewear</p>
              <p>Professional Optics</p>
              <p>Quality Guarantee</p>
              <p>Global Shipping</p>
            </div>

            {/* Contact Us Section */}
            <div className="flex flex-col text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
              <p>Email: zoopiceyeopticals@gmail.com</p>
              <p>Phone: + 9452122529</p>
            </div>

            {/* About Us Section */}
            <div className="flex flex-col text-center md:text-left">
              <h2 className="text-lg font-semibold mb-4">About Us</h2>
              <Link to="/About">
                <p className="hover:underline">About zoopiceye</p>
              </Link>
              <Link to="/SpectacleList">
                <p className="hover:underline">Brands & Collections</p>
              </Link>
              <p className="hover:underline">Orders & Shipping</p>
              <p className="hover:underline">Secure Payment</p>
            </div>
          </div>
        </div>

        {/* Divider and Footer Links */}
        <div className="bg-[#54c9f3]">
          <hr className="border-black border-1" />
          <div className="text-center text-[#fafcffe3] hover:text-blue-600 cursor-pointer">
            <p>Terms & Conditions || Privacy Policy</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
