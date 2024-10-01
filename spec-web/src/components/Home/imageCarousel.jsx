import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Set interval for automatic scrolling
  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <>
    <div className='bg-[#0bb1c7fe]'>
    <div className="relative w-full max-w-[700px] mx-auto p-3">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-[700px] h-[450px] rounded-lg"
      />
      {/* Navigation buttons (optional) */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full p-2"
      >
        
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full p-2"
      >
        
      </button>
    </div>
    </div>
    </>
  );
};

export default ImageCarousel;
