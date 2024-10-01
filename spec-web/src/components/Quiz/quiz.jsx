import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (openQuestion === questionIndex) {
      setOpenQuestion(null); // Close the question if it's already open
    } else {
      setOpenQuestion(questionIndex); // Open the clicked question
    }
  };

  return (
    <div className="w-full bg-gray-100 py-10 ">
      <div className="container w-full  bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-6">Frequently Asked Questions</h1>

        {/* Question 1 */}
        <div className="border-b border-gray-300 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestion(1)}
          >
            <h2 className="text-lg font-medium">What is the return policy?</h2>
            {openQuestion === 1 ? <FaMinus /> : <FaPlus className="text-red-500"/>}
          </div>
          {openQuestion === 1 && (
            <div className="mt-4 text-gray-700">
              <p>
                We offer a 30-day return policy. If you're not satisfied with
                your purchase, you can return the product within 30 days for a
                full refund or exchange, provided it's in original condition.
              </p>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="border-b border-gray-300 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestion(2)}
          >
            <h2 className="text-lg font-medium">How long does delivery take?</h2>
            {openQuestion === 2 ? <FaMinus /> : <FaPlus className="text-red-500"/>}
          </div>
          {openQuestion === 2 && (
            <div className="mt-4 text-gray-700">
              <p>
                Delivery usually takes 3-5 business days for standard shipping
                and 1-2 business days for express shipping.
              </p>
            </div>
          )}
        </div>

        {/* Question 3 */}
        <div className="border-b border-gray-300 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestion(3)}
          >
            <h2 className="text-lg font-medium">
              Can I track my order after it's been shipped?
            </h2>
            {openQuestion === 3 ? <FaMinus /> : <FaPlus className="text-red-500"/>}
          </div>
          {openQuestion === 3 && (
            <div className="mt-4 text-gray-700">
              <p>
                Yes, once your order is shipped, we will send you a tracking
                number via email. You can use it to check the status of your
                delivery.
              </p>
            </div>
          )}
        </div>

        {/* Question 4 */}
        <div className="border-b border-gray-300 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestion(4)}
          >
            <h2 className="text-lg font-medium">Do you ship internationally?</h2>
            {openQuestion === 4 ? <FaMinus /> : <FaPlus className="text-red-500"/>}
          </div>
          {openQuestion === 4 && (
            <div className="mt-4 text-gray-700">
              <p>
                Yes, we ship internationally! Shipping costs and delivery times
                will vary depending on the destination country.
              </p>
            </div>
          )}
        </div>

        {/* Question 5 */}
        <div className="border-b border-gray-300 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestion(5)}
          >
            <h2 className="text-lg font-medium">What payment methods do you accept?</h2>
            {openQuestion === 5 ? <FaMinus /> : <FaPlus className="text-red-500"/>}
          </div>
          {openQuestion === 5 && (
            <div className="mt-4 text-gray-700">
              <p>
                We accept all major credit cards (Visa, MasterCard, American
                Express), PayPal, and Apple Pay.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
