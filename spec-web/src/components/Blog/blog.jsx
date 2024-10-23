import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/pic01.jpeg';
import logo1 from '../../assets/spec01.jpg';
import { FaSmile } from 'react-icons/fa';

const Blog = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 mt-24">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-[#1ea1a3] mb-6">The Perfect Pair of Spectacles from ZoopicEye</h1>
        <p className="text-gray-700 text-lg mb-4">
          At ZoopicEye, we believe that eyewear is more than just a necessity—it's a fashion statement. Whether you're
          looking for spectacles that match your style, boost your confidence, or enhance your vision, we've got the
          perfect collection for you. Our range of spectacles is designed to offer comfort, durability, and of course,
          trend-setting style.
        </p>
       
        <h2 className="text-3xl font-semibold text-[#1ea1a3] mt-8 mb-4">Why Choose ZoopicEye Spectacles?</h2>
        <p className="text-gray-700 text-lg mb-4">
          ZoopicEye stands out because we prioritize quality, affordability, and customer satisfaction. Here’s why you
          should choose our spectacles:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          <li>
            <strong>Premium Quality:</strong> We use only high-quality materials for our frames and lenses to ensure that
            your spectacles are not only stylish but also long-lasting.
          </li>
          <li>
            <strong>Affordable Prices:</strong> Get the perfect pair of spectacles without breaking the bank. Our prices
            are competitive, ensuring value for your money.
          </li>
          <li>
            <strong>Wide Variety:</strong> From classic designs to modern, bold styles, our collection caters to every
            taste and need. Whether you want subtle sophistication or a pop of color, we’ve got you covered.
          </li>
          <li>
            <strong>Customizable Options:</strong> Need prescription lenses? No problem! We offer customization options
            to ensure your spectacles meet your vision requirements.
          </li>
        </ul>

        <img
          src={logo}
          alt="ZoopicEye Spectacles"
          className="w-[full] h-[400px] rounded-lg shadow-lg mb-6"
        />
        <h2 className="text-3xl font-semibold text-[#1ea1a3] mt-8 mb-4">Fashion Meets Functionality</h2>
        <p className="text-gray-700 text-lg mb-4">
          When you wear ZoopicEye spectacles, you're not just wearing a tool to help you see better. You're embracing a
          piece of fashion that complements your personality. Our frames are designed to fit comfortably on your face,
          while our lenses offer superior clarity and protection from harmful UV rays. Choose from a variety of shapes,
          sizes, and colors to find the perfect match for your face shape and skin tone.
        </p>

        <h2 className="text-3xl font-semibold text-[#1ea1a3] mt-8 mb-4">Our Top Picks</h2>
        <p className="text-gray-700 text-lg mb-4">
          Here are some of our best-selling styles that our customers love:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          <li>
            <strong>Classic Rectangle Frames:</strong> Timeless and versatile, these frames suit almost every face shape
            and are perfect for daily wear.
          </li>
          <li>
          <img
          src={logo1}
          alt="ZoopicEye Spectacles"
          className="w-[full] h-[400px] rounded-lg shadow-lg mb-6"
        />
            <strong>Bold Cat-Eye Frames:</strong> Make a statement with these chic and bold frames that add a touch of
            drama to any outfit.
          </li>
          <li>
            <strong>Retro Round Frames:</strong> For the trendsetter, these frames offer a vintage vibe with a modern
            twist, ideal for both men and women.
          </li>
          <li>
            <strong>Lightweight Rimless Frames:</strong> Offering minimalistic elegance, these frames are perfect for
            those who prefer a subtle look.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold text-[#1ea1a3] mt-8 mb-4">Customer Satisfaction Guaranteed</h2>
        <p className="text-gray-700 text-lg mb-4">
          At ZoopicEye, we pride ourselves on providing top-notch customer service. We offer free shipping on all
          orders, and if you're not completely satisfied with your purchase, we have a hassle-free return policy.
          Your happiness is our priority!
        </p>

        <blockquote className="border-l-4 border-[#1ea1a3] pl-4 text-gray-700 italic mb-6">
          "I absolutely love my new spectacles from ZoopicEye! They are stylish, comfortable, and affordable. I get
          compliments every time I wear them!" – Sarah, ZoopicEye Customer
        </blockquote>

        <h2 className="text-3xl font-semibold text-[#1ea1a3] mt-8 mb-4">Conclusion</h2>
        <p className="text-gray-700 text-lg mb-4">
          Whether you're shopping for your first pair of glasses or looking to expand your collection, ZoopicEye has the
          perfect pair of spectacles waiting for you. Explore our collection today and find the eyewear that makes you
          look and feel your best!
        </p>

        <div className="text-center mt-8">
          <Link
            to="/SpectacleList"
            className="bg-[#1ea1a3] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#178588] transition-all duration-300"
          >
            Shop Now
          </Link>
         {/* <span> <FaSmile className="text-yellow-500 text-3xl ml-32 mt-10" /> </span> */}
    
        </div>
      </div>
    </div>
  );
};

export default Blog;
