import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import backgroundImage1 from '../../assets/spec13.jpg';
import backgroundImage2 from '../../assets/spec14.jpg';
import backgroundImage3 from '../../assets/spec21.jpg';

const slides = [
  {
    image: backgroundImage1,
    title: "Exclusive Sunglasses for Everyone!",
    description: "From classic to modern designs, find the perfect pair to match your style and personality.",
    buttonText: "Shop Now",
    link: "/SpectacleList",
  },
  {
    image: backgroundImage2,
    title: "Exclusive Sunglasses for Everyone!",
    description: "From classic to modern designs, find the perfect pair to match your style and personality.",
    buttonText: "Shop Now",
    link: "/SpectacleList",
  },
  {
    image: backgroundImage3,
    title: "Exclusive Sunglasses for Everyone!",
    description: "From classic to modern designs, find the perfect pair to match your style and personality.",
    buttonText: "Shop Now",
    link: "/SpectacleList",
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); 

    return () => clearInterval(slideInterval); 
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative">
      <div
      
        className="mt-24 py-12 text-center bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0"></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold px-4 pt-5 sm:px-8 lg:px-32 bg-gradient-to-r from-[#f3850e] via-[#087a82] to-[#f30ab9] text-transparent bg-clip-text">
            {slides[currentSlide].title}
          </h2>
          <p className="text-[#171b1f] p-6 text-base sm:text-lg lg:text-xl mx-auto max-w-3xl">
            {slides[currentSlide].description}
          </p>
          <div className="mt-6 flex justify-center">
            <Link to={slides[currentSlide].link}>
              <button className="h-14 w-48 bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-white rounded-md flex justify-center items-center space-x-2 transition hover:translate-x-2 cursor-pointer ">
                {slides[currentSlide].buttonText}
                <FaArrowUpRightFromSquare className="text-white h-6 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default Carousel;
