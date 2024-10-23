import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/pic01.jpeg';
import logo1 from '../../assets/pic01.jpeg';
import OurTeam from './ourTeam';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen py-16 pt-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#24939d]">About Zoopiceye</h1>
          <p className="mt-4 text-lg text-gray-600 leading-7">
            Your trusted destination for fashionable, high-quality eyewear.
            Bringing vision and style together for every unique individual.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          <div className="text-lg">
            <h2 className="text-4xl font-bold text-[#24939d] mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2024, Zoopiceye was born from a passion to make eyewear accessible to all.
              We believe that glasses are more than just a tool for clear vision—they are a statement of style, confidence, and personality.
              Our mission is to provide high-quality, affordable eyewear that helps everyone see the world more clearly and look their best.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With a wide range of frames, from classic styles to bold, modern designs, we aim to serve diverse tastes and needs.
              Our expert team works tirelessly to ensure each product meets the highest standards of comfort, durability, and fashion.
            </p>
          </div>
          <div className="flex justify-center">
            <img src={logo} alt="Our Team" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          <div className="flex justify-center">
            <img src={logo1} alt="Our Mission" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="text-lg">
            <h2 className="text-4xl font-bold text-[#24939d] mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Zoopiceye, our mission is simple: to combine vision and fashion with a focus on innovation and sustainability.
              We prioritize quality and craftsmanship, ensuring that every pair of spectacles enhances not only your vision but also your confidence.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We're also committed to giving back. Through our "See the Future" initiative, we partner with local organizations to provide eye care to underserved communities around the world.
              Every purchase you make helps someone else gain access to the gift of clear sight.
            </p>
            <Link
              to="/SpectacleList"
              className="inline-block mt-4 py-3 px-6 bg-[#24939d] text-white font-semibold rounded-lg shadow hover:bg-black transition-all duration-300"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#24939d] mb-4">Our Core Values</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs mb-6">
              <h3 className="text-xl font-semibold text-[#24939d] mb-2">Quality</h3>
              <p className="text-gray-600">
                We are committed to delivering eyewear that meets the highest standards in terms of durability, design, and comfort.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs mb-6">
              <h3 className="text-xl font-semibold text-[#24939d] mb-2">Affordability</h3>
              <p className="text-gray-600">
                Our goal is to make stylish and reliable eyewear accessible to everyone without compromising on quality.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs mb-6">
              <h3 className="text-xl font-semibold text-[#24939d] mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to offer cutting-edge designs and technologies that improve vision and comfort.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs mb-6">
              <h3 className="text-xl font-semibold text-[#24939d] mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Our commitment to sustainability means that we use eco-friendly materials and practices throughout our production process.
              </p>
            </div>
          </div>
        </div>
        <OurTeam/>
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#24939d] mb-6">Join the Zoopiceye Family</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Whether you're searching for the perfect frame or simply seeking inspiration, we're here to help you see the world differently.
            Join us on our journey of vision, style, and empowerment.
          </p>
          <Link
            to="/"
            className="inline-block py-3 px-6 bg-[#24939d] text-white font-semibold rounded-lg shadow hover:bg-black transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
