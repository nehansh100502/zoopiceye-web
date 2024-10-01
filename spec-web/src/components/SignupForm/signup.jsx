

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Added phone state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Client-side validation function
  const validateForm = () => {
    const newErrors = {};

    // Username validation: only letters and spaces, capitalize first letter of each word
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!/^[A-Za-z\s]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters and spaces';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Phone validation: 10-digit number
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Password validation: at least 6 characters, one uppercase letter, one number
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      newErrors.password = 'Password must be at least 6 characters, include one uppercase letter and one number';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, phone }),
      });

      const data = await response.json();

      if (response.status === 400 && Array.isArray(data.errors)) {
        // Handle validation errors
        data.errors.forEach(error => {
          setErrors(prevErrors => ({ ...prevErrors, [error.param]: error.msg }));
        });
      } else if (response.ok) {
        // Handle successful signup
        setSuccess('Signup successful! Redirecting to login...');

        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          email: data.email,
          token: data.token,
        }));

        // Navigate to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle other errors
        setErrors({ general: data.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred during signup. Please try again.' });
    }
  };

  // Format input by capitalizing first letter of each word
  const formatUsername = (value) => {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#23afbc] py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 bg-[#126c768f] p-8 rounded-lg shadow mt-28">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
          <p className="mt-6 text-center text-sm text-gray-600">Or use your email for registration</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Username Field */}
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-500" />
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(formatUsername(e.target.value))}
                className={`appearance-none rounded w-full px-3 py-2 pl-10 border ${errors.username ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.username}</p>
              )}
            </div>
            {/* Email Field */}

            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-500" />

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded w-full px-3 py-2 pl-10 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-500" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`appearance-none rounded w-full px-3 py-2 pl-10 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded w-full px-3 py-2 pl-10 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`appearance-none rounded w-full px-3 py-2 pl-10 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="text-red-600 text-sm mt-2 text-center">
              {errors.general}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-green-600 text-sm mt-2 text-center">
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#373d62] hover:bg-[#455472] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Sign Up
            </button>
          </div>

          <div className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;