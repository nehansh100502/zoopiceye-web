import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/pic01.jpeg';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // State for success message
  const [error, setError] = useState(''); // State for error message (optional)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const contactData = {
      name,
      email,
      message,
    };
  
    try {
      const response = await fetch('http://localhost:4000/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
  
      if (response.ok) {
        setSuccess(true); // Set success to true if response is OK
        setError(''); // Clear any error
        setName(''); // Clear form fields
        setEmail('');
        setMessage('');
      } else {
        setSuccess(false);
        setError('Failed to send message. Please try again.'); // Set error message
      }

      const result = await response.json();
      console.log(result); // Optional: log the result
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.'); // Show error message if the request fails
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#ffffff] to-[#ffffff] mt-5">
      <div className="flex flex-col md:flex-row items-center justify-center p-10 bg-white shadow-lg rounded-lg space-x-8">
        <div className="hidden md:block">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="h-[400px] w-[400px] object-cover rounded-lg shadow-md" />
          </Link>
        </div>
        
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-4xl font-extrabold text-[#24939d] pt-16">Contact Us</h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              We’d love to hear from you! Please fill out the form below.
            </p>
          </div>

          {/* Show success message if form was submitted successfully */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Your message has been sent.</span>
            </div>
          )}

          {/* Show error message if something went wrong */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                  placeholder="Your Message"
                  rows="5"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group w-full py-3 px-4 bg-gradient-to-r from-[#2f7ea5] to-[#1c9aa5] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
