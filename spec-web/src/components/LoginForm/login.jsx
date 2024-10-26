// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [step, setStep] = useState(1);
//   const [showResetDropdown, setShowResetDropdown] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Validation function
//   const validateForm = () => {
//     if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     if (!password || password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }
//     if (step === 2 && (!otp || otp.length !== 6)) {
//       setError('Please enter a valid OTP');
//       return false;
//     }
//     if (step === 2 && (!password || password.length < 6)) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }
//     setError('');
//     return true;

//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Login failed');
//       } else {
//         login(data.token, data.refreshToken, { id: data.userId, username: data.username });
//         localStorage.setItem('userId', data.userId);
//         localStorage.setItem('username', data.username);
//         navigate('/');
//       }
//     } catch (error) {
//       setError('An error occurred during login');
//     }
//   };

//   const handleRequestOtp = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/request-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobile }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Failed to request OTP');
//       } else {
//         setMessage('OTP has been sent to your mobile number.');
//         setStep(2);
//       }
//     } catch (error) {
//       setError('An error occurred while requesting OTP');
//     }
//   };
//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobile, otp, newPassword: password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Failed to reset password');
//       } else {
//         setMessage('Password has been reset successfully!');
//         setStep(1);
//       }
//     } catch (error) {
//       setError('An error occurred while resetting password');
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#23a5ac] py-12 px-4 sm:px-6 lg:px-8 mt-20">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <div className="rounded-md shadow-sm ">
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded relative block w-full px-3 mt-4 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-600 text-sm mt-2 text-center">
//               {error}
//             </div>
//           )}

//           <div className="flex items-center justify-between">
//             <div className="text-sm">
//               <button
//                 type="button"
//                 className="font-medium text-[#f4f5f7] hover:text-indigo-500"
//                 onClick={() => setShowResetDropdown(!showResetDropdown)}
//               >
//                 Forgot your password?
//               </button>
//             </div>
//           </div>

//           {showResetDropdown && (
//             <div className="mt-4 p-4 border rounded-md bg-gray-100">
//               <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
//               <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//                 {/* Mobile Input */}
//                 <div className="rounded-md shadow-sm ">
//                   <div>
//                     <label htmlFor="mobile" className="sr-only">
//                       Mobile Number
//                     </label>
//                     <input
//                       id="mobile"
//                       name="mobile"
//                       type="text"
//                       required
//                       value={mobile}
//                       onChange={(e) => setMobile(e.target.value)}
//                       className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 text-sm"
//                       placeholder="Mobile Number"
//                     />
//                   </div>
//                   {/* OTP Input (only shown after requesting OTP) */}
//                   {step === 2 && (
//                     <div>
//                       <label htmlFor="otp" className="sr-only">
//                         OTP
//                       </label>
//                       <input
//                         id="otp"
//                         name="otp"
//                         type="text"
//                         required
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="appearance-none rounded relative block w-full px-3 mt-4 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 text-sm"
//                         placeholder="Enter OTP"
//                       />
//                     </div>
//                   )}
//                   {/* Password Input (only shown in OTP step) */}
//                   {step === 2 && (
//                     <div>
//                       <label htmlFor="password" className="sr-only">
//                         New Password
//                       </label>
//                       <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         required
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="appearance-none rounded relative block w-full px-3 mt-4 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                         placeholder="New Password"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {error && (
//                   <div className="text-red-600 text-sm mt-2 text-center">
//                     {error}
//                   </div>
//                 )}
//                 {message && (
//                   <div className="text-green-600 text-sm mt-2 text-center">
//                     {message}
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between">
//                   <div className="text-sm">
//                     <button
//                       type="button"
//                       className="font-medium text-[#f4f5f7] hover:text-indigo-500"
//                       onClick={step === 1 ? handleRequestOtp : handleResetPassword}
//                     >
//                       {step === 1 ? 'Request OTP' : 'Reset Password'}
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a4f67] hover:bg-[#3a5f7d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     Sign In
//                   </button>
//                 </div>
//                 <p className="text-center mt-4">
//                   Don't have an account?{' '}
//                   <Link to="/Signup" className="text-violet-800 font-bold">
//                     Sign Up
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a4f67] hover:bg-[#3a5f7d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign In
//             </button>
//           </div>
//           <p className="text-center mt-4">
//             Don't have an account?{' '}
//             <Link to="/Signup" className="text-violet-800 font-bold">
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // Track the current step (login or OTP)
  const [showResetDropdown, setShowResetDropdown] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Validation function
  const validateForm = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (step === 2) {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid OTP');
        return false;
      }
      if (!password || password.length < 6) {
        setError('New password must be at least 6 characters long');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        login(data.token, data.refreshToken, { id: data.userId, username: data.username });
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        navigate('/');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:4000/api/v1/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to request OTP');
      } else {
        setMessage('OTP has been sent to your mobile number.');
        setStep(2);
      }
    } catch (error) {
      setError('An error occurred while requesting OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:4000/api/v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to reset password');
      } else {
        setMessage('Password has been reset successfully!');
        setStep(1);
      }
    } catch (error) {
      setError('An error occurred while resetting password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#23a5ac] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleLogin : handleResetPassword}>
          <div className="rounded-md shadow-sm ">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 mt-4 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm mt-2 text-center">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-[#f4f5f7] hover:text-indigo-500"
                onClick={() => setShowResetDropdown(!showResetDropdown)}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {showResetDropdown && (
            <div className="mt-4 p-4 border rounded-md bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none rounded relative block w-full px-3 mt-4 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 text-sm"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none rounded relative block w-full px-3 mt-4 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2 text-center">
                  {error}
                </div>
              )}
              {message && (
                <div className="text-green-600 text-sm mt-2 text-center">
                  {message}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a4f67] hover:bg-[#3a5f7d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}
      

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a4f67] hover:bg-[#3a5f7d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/Signup" className="text-violet-800 font-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
