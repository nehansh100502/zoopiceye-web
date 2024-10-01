
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save cart and wishlist to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Check for token and user on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Retrieve userId
    if (token) {
      fetchUserProfile(token);
      setIsLoggedIn(true); // Set logged in state if token exists
    }
    if (userId) {
      setUser({ id: userId }); // Set user state if userId exists
    }
  }, []);


const fetchUserProfile = async (token) => {
  try {
      const response = await fetch('http://localhost:4000/api/v1/user/profile', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          const data = await response.json();
          setUser({
              _id: data.user._id,
              username: data.user.username,
              email: data.user.email,
          });
          setIsLoggedIn(true);
      } else if (response.status === 401) {
          // Token might be expired, try to refresh it
          await handleTokenRefresh();
      } else {
          console.error('Failed to fetch profile data:', response.statusText);
          logout();
      }
  } catch (error) {
      console.error('Error fetching profile data:', error);
      logout();
  }
};


useEffect(() => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const refreshToken = localStorage.getItem('refreshToken');

  console.log('Token on load:', token); // Log token for debugging

  if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
  } else {
      console.warn("User not logged in, token is null");
      // Handle if user is not logged in, maybe redirect or show a different UI
  }

  if (userId) {
      setUser({ id: userId });
  }
}, []);




const fetchUserDetails = async (token) => {
  try {
      const response = await fetch('http://localhost:4000/api/v1/user/Details', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          const data = await response.json();
          setUser({
              _id: data.user._id,
              username: data.user.username,
              email: data.user.email,
              orders: data.user.orders  // Store the orders in user state
          });
          setIsLoggedIn(true);
      } else {
          console.error('Failed to fetch user details:', response.statusText);
          logout();
      }
  } catch (error) {
      console.error('Error fetching user details:', error);
      logout();
  }
};

  // Token refresh logic
  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      logout();
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        fetchUserProfile(token);
      } else {
        console.error('Failed to refresh token');
        logout();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Retrieve userId
    const username = localStorage.getItem('username'); // Retrieve username

    if (token) {
      setIsLoggedIn(true); // Set logged in state if token exists
      // Initialize user with the username if available
      if (username) {
        setUser({ id: userId, username }); // Set user state with username
      }
    }
  }, []);

  // Login function
  const login = (token, refreshToken, userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userData._id); // Store userId in localStorage
    localStorage.setItem('username', userData.username); 
    localStorage.setItem('email', userData.email); 
    fetchUserProfile(token); // Fetch profile after logging in
  };
  

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId'); // Remove userId from localStorage
     localStorage.removeItem('username'); 
    setCart([]); // Clear cart on logout
    setWishlist([]); // Clear wishlist on logout
  };

  // Cart operations
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  // Wishlist operations
  const addToWishlist = (item) => {
    if (!wishlist.find((wishItem) => wishItem._id === item._id)) {
      setWishlist((prevWishlist) => [...prevWishlist, item]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      cart,
      addToCart,
      removeFromCart,
      wishlist,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}








//   // Fetch user profile data
//   const fetchUserProfile = async (token) => {
//     try {
//         const response = await fetch('http://localhost:4000/api/v1/user', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             setUser({
//                 _id: data.user._id,
//                 username: data.user.username,
//                 email: data.user.email
//             });
//             setIsLoggedIn(true);
//         } else {
//             console.error('Failed to fetch profile data:', response.statusText);
//             logout();
//         }
//     } catch (error) {
//         console.error('Error fetching profile data:', error);
//         logout();
//     }
// };