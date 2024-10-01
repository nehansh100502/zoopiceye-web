// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEdit } from 'react-icons/fa';
// import { useAuth } from '../../AuthContext'; // Importing the useAuth hook
// import WishlistCard from '../Wishlisht/wishlishtCard'; // Import the WishlistCard component
// import defaultProfilePic from '../../assets/pic01.jpeg'; // Adjust the path accordingly

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     name: '', 
//     dob: '',  
//   });
//   const [editing, setEditing] = useState(false);
//   // const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { wishlist, removeFromWishlist } = useAuth(); // Fetching wishlist from Auth context

//   // Fetch user profile data from the backend
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const storedUserProfile = localStorage.getItem('userProfile');
        
//         // If data exists in localStorage, use it
//         if (storedUserProfile) {
//           const parsedUserProfile = JSON.parse(storedUserProfile);
//           setUser(parsedUserProfile);
//           // setPreview(parsedUserProfile.profilePic);
//           setLoading(false);
//         } else {
//           // If no data in localStorage, fetch from API
//           const response = await axios.get('http://localhost:4000/api/v1/getUserProfileId');
//           const { name, dob, profilePic } = response.data;

//           const userProfileData = {
//             name: name || '', 
//             dob: dob || '',   
//             // profilePic
//           };

//           setUser(userProfileData);
//           // setPreview(profilePic);
//           setLoading(false);
          
//           // Save to localStorage
//           localStorage.setItem('userProfile', JSON.stringify(userProfileData));
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         setMessage('Failed to load user profile. Please try again later.');
//         setLoading(false);
//       }
//     };
    
//     fetchUserProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setUser({ ...user, profilePic: file });
//   //     setPreview(URL.createObjectURL(file));
//   //   }
//   // };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('name', user.name);
//       formData.append('dob', user.dob);
//       // formData.append('profilePic', user.profilePic);

//       await axios.post('http://localhost:4000/api/v1/updateProfile', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const updatedUserProfile = {
//         name: user.name,
//         dob: user.dob,
//         // profilePic: user.profilePic
//       };

//       setUser(updatedUserProfile);
//       // setPreview(user.profilePic);
//       setMessage('Your profile has been updated successfully! 🎉');
//       setEditing(false);

//       // Update localStorage after successful submission
//       localStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));

//       setTimeout(() => {
//         setMessage('');
//       }, 2000);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setMessage('Failed to update profile. Please try again. ❌');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-20">
//         <p>Loading your profile...</p>
//       </div>
//     );
//   }

//   // Get the first letter of the user's name
//   const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : '';

//   return (
//     <div className="max-w-auto mx-auto mt-10 bg-[#ece9e9] p-8 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-center mb-4 mt-20 text-[#2cb5ca]">My Profile</h2>
//       <div className="text-center mb-6 relative">
//         {
//       (
//           // Display the fallback image if no profile picture is available
//           <img
//             src={defaultProfilePic}
//             alt="Default Profile"
//             className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-4 border-gray-300 shadow-md"
//           />
//         )}
//         {!editing && (
//           <FaEdit
//             className="text-blue-500 hover:text-blue-600 absolute right-2 top-0 cursor-pointer"
//             onClick={handleEdit}
//             size={20}
//           />
//         )}
//       </div>
//       <div className="text-center mb-8">
//         <p className="text-xl font-bold font-serif text-gray-700">{user.name}</p>
//         <p className="text-xl font-medium text-gray-500">{user.dob}</p>
//       </div>
//       {editing ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={user.name || ''} 
//               onChange={handleInputChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="dob" className="block font-medium text-gray-700">Date of Birth</label>
//             <input
//               type="date"
//               id="dob"
//               name="dob"
//               value={user.dob || ''} 
//               onChange={handleInputChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <div>
        
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="text-center">
//           {message && (
//             <div className="bg-green-100 text-green-600 p-2 rounded-md mb-4">
//               {message}
//             </div>
//           )}
//         </div>
//       )}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">My Wishlist 🛍️</h3>
//         {wishlist.length === 0 ? (
//           <div className="text-center">
//             <p>Your wishlist is empty. Start adding some products!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {wishlist.map((item) => (
//               <WishlistCard
//                 key={item._id}
//                 item={item}
//                 onRemove={removeFromWishlist} // Pass the remove function
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../AuthContext'; // Importing the useAuth hook
import WishlistCard from '../Wishlisht/wishlishtCard'; // Import the WishlistCard component
import defaultProfilePic from '../../assets/pic01.jpeg'; // Adjust the path accordingly
import { FaShoppingCart } from 'react-icons/fa';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '', 
    dob: '',  
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { wishlist, removeFromWishlist } = useAuth(); // Fetching wishlist from Auth context

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUserProfile = localStorage.getItem('userProfile');
        
        // If data exists in localStorage, use it
        if (storedUserProfile) {
          const parsedUserProfile = JSON.parse(storedUserProfile);
          setUser(parsedUserProfile);
          setLoading(false);
        } else {
          // If no data in localStorage, fetch from API
          const response = await axios.get('http://localhost:4000/api/v1/getUserProfileId');
          const { name, dob } = response.data;

          const userProfileData = {
            name: name || '', 
            dob: dob || '',   
          };

          setUser(userProfileData);
          setLoading(false);
          
          // Save to localStorage
          localStorage.setItem('userProfile', JSON.stringify(userProfileData));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setMessage('Failed to load user profile. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('dob', user.dob);

      await axios.post('http://localhost:4000/api/v1/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUserProfile = {
        name: user.name,
        dob: user.dob,
      };

      setUser(updatedUserProfile);
      setMessage('Your profile has been updated successfully! 🎉');
      setEditing(false);

      // Update localStorage after successful submission
      localStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));

      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again. ❌');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Get the first letter of the user's name
  // const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-[#ece9e9] p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4 mt-10 text-[#2cb5ca]">My Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-10">
        <div className="text-center relative">
          <img
            src={defaultProfilePic}
            alt="Default Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-300 shadow-md"
          />
          {!editing && (
            <FaEdit
              className="text-blue-500 hover:text-blue-600 absolute right-2 top-0 cursor-pointer"
              onClick={handleEdit}
              size={20}
            />
          )}
        </div>
        <div className="bg-[#ffffffee] p-6 rounded-lg shadow-md">
          <div className="text-center md:text-left">
            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name || ''} 
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={user.dob || ''} 
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
               <div className='bg-[#ffffffe9]'>
                 <p className="text-xl font-bold font-serif text-gray-700">{user.name}</p>
               <p className="text-lg font-medium text-gray-500">{user.dob}</p></div>
                {message && (
                  <div className="bg-green-100 text-green-600 p-2 rounded-md mt-4">
                    {message}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
     
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">My Wishlist 🛍️</h3>
        {wishlist.length === 0 ? (
          <div className="text-center">
            <p>Your wishlist is empty. Start adding some products!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <WishlistCard
                key={item._id}
                item={item}
                onRemove={removeFromWishlist} 
              />
            ))}
          </div>
        )}
      </div>
      {/* <div className="flex text-center">
  <FaShoppingCart className="text-blue-600 text-3xl mr-2" />
  <h3 className="text-sm font-semibold">Enjoy Free Shipping on All Orders</h3>
</div> */}
    </div>
  );
};

export default UserProfile;
