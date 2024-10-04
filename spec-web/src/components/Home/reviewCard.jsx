import React, { useRef } from 'react';

// Sample reviews data
const reviews = [
  { id: 1, username: 'Priya Kushwaha', comment: 'This product is amazing! Highly recommended.', rating: 5 },
  { id: 2, username: 'Ankit Sharma', comment: 'Fantastic service and quality!', rating: 4 },
  { id: 3, username: 'Riyaz Ali', comment: 'Exceeded my expectations!', rating: 5 },
  { id: 4, username: 'Anjali Tiwari', comment: 'Great experience, I will buy again.', rating: 4.5 },
  { id: 5, username: 'Priyanshu Kumar', comment: 'Worth every penny, love it!', rating: 5 },
  { id: 6, username: 'Riya Dubey', comment: 'Top-notch quality!', rating: 5 },
  { id: 7, username: 'Hema Chaudhary', comment: 'Superb customer support!', rating: 4 },
];

// StarRating component for displaying star ratings
const StarRating = ({ rating }) => (
  <div className="flex">
    {Array.from({ length: Math.floor(rating) }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-yellow-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927a.5.5 0 01.902 0l1.588 4.899a.5.5 0 00.474.34h5.136c.33 0 .469.42.227.617l-4.153 3.188a.5.5 0 00-.182.54l1.588 4.899a.5.5 0 01-.768.544L10 14.454l-4.05 3.1a.5.5 0 01-.768-.544l1.588-4.899a.5.5 0 00-.182-.54L2.435 8.783a.5.5 0 01.227-.617h5.136a.5.5 0 00.474-.34l1.588-4.899z" />
      </svg>
    ))}
    {rating % 1 !== 0 && (
      <svg
        className="h-5 w-5 text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927a.5.5 0 01.902 0l1.588 4.899a.5.5 0 00.474.34h5.136c.33 0 .469.42.227.617l-4.153 3.188a.5.5 0 00-.182.54l1.588 4.899a.5.5 0 01-.768.544L10 14.454l-4.05 3.1a.5.5 0 01-.768-.544l1.588-4.899a.5.5 0 00-.182-.54L2.435 8.783a.5.5 0 01.227-.617h5.136a.5.5 0 00.474-.34l1.588-4.899z" />
      </svg>
    )}
  </div>
);

const ReviewCard = () => {
  const scrollRef = useRef(null);

  // Scroll handler for left and right scroll
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#13a6cb]">Customer Reviews</h2>
      <div className="flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-lg z-10 transition duration-200"
        >
          &#8592;
        </button>

        {/* Scrollable reviews */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-lg rounded-lg p-6 w-[300px] h-[200px] flex flex-col justify-between transition transform hover:shadow-xl"
            >
              <div>
                <p className="text-[#2ca5f6] font-semibold text-lg text-center">{review.username}</p>
                <p className="text-gray-600 mt-2 text-center">{review.comment}</p>
              </div>
              <div className="p-9">
                <StarRating rating={review.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-lg z-10 transition duration-200"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
