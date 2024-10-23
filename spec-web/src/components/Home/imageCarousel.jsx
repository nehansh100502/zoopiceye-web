import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <div className='bg-gradient-to-b from-[#ffffff] to-[#0d4e83dc]'>
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
