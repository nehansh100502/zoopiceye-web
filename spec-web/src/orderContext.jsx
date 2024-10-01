// // import React, { createContext, useState, useEffect } from 'react';
// // import axios from 'axios';

// // export const OrderContext = createContext();

// // export const OrderProvider = ({ children }) => {
// //   const [order, setOrder] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchOrderData = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`); // Adjust orderId as needed
// //         setOrder(response.data.order);
// //       } catch (err) {
// //         console.error(err);
// //         setError('Failed to fetch order details');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrderData();
// //   }, []);

// //   return (
// //     <OrderContext.Provider value={{ order, loading, error }}>
// //       {children}
// //     </OrderContext.Provider>
// //   );
// // };


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//     const [orderData, setOrderData] = useState(null);
//     const [orderId, setOrderId] = useState(null); // Ensure orderId is initialized

//     // Function to fetch order data
//     const fetchOrderData = async () => {
//         if (!orderId) {
//             console.error('orderId is not defined');
//             return; // Prevent further execution if orderId is not set
//         }

//         try {
//             const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`); // Use the orderId here
//             setOrderData(response.data);
//         } catch (error) {
//             console.error('Error fetching order data:', error);
//         }
//     };

//     // Use effect to fetch order data on mount or when orderId changes
//     useEffect(() => {
//         fetchOrderData();
//     }, [orderId]); // Dependency on orderId

//     return (
//         <OrderContext.Provider value={{ orderData, setOrderId }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };

// // Custom hook for using OrderContext
// export const useOrder = () => {
//     return useContext(OrderContext);
// };


// // src/orderContext.jsx

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// // Create the OrderContext
// export const OrderContext = createContext();

// // Create a provider component
// export const OrderProvider = ({ children }) => {
//     const [orderData, setOrderData] = useState(null);
//     const [orderId, setOrderId] = useState(null); // Initialize orderId

//     // Function to fetch order data
//     const fetchOrderData = async () => {
//         if (!orderId) {
//             console.error('orderId is not defined');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`);
//             setOrderData(response.data);
//         } catch (error) {
//             console.error('Error fetching order data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchOrderData();
//     }, [orderId]); // Run when orderId changes

//     return (
//         <OrderContext.Provider value={{ orderData, setOrderId }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };

// // Custom hook for using OrderContext
// export const useOrder = () => {
//     return useContext(OrderContext);
// };


// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const OrderContext = createContext();

// const OrderProvider = ({ children }) => {
//     const [orderId, setOrderId] = useState(null); // Initialize orderId
//     const [orders, setOrders] = useState([]);

//     const fetchOrderData = async () => {
//         if (!orderId) {
//             console.error("orderId is not defined");
//             return; // Early return if orderId is not defined
//         }

//         try {
//             const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`);
//             setOrders(response.data);
//         } catch (error) {
//             console.error("Error fetching order data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchOrderData();
//     }, [orderId]); // Fetch order data when orderId changes

//     return (
//         <OrderContext.Provider value={{ orderId, setOrderId, orders }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };

// export default OrderProvider;

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//     const [orderId, setOrderId] = useState(null); // Initialize orderId
//     const [orders, setOrders] = useState([]); // State to hold orders
//     const [order, setOrder] = useState(null); // State to hold a single order

//     // Fetch order data when orderId is defined
//     const fetchOrderData = async (id) => {
//         if (!id) return; // Exit if orderId is not defined

//         try {
//             const response = await axios.get(`http://localhost:4000/api/v1/orders/user/${userId}`);
//             if (response.data.success) {
//                 setOrder(response.data); // Set the order data
//             } else {
//                 console.error('Failed to fetch order data:', response.data.message);
//             }
//         } catch (error) {
//             console.error('Error fetching order data:', error);
//         }
//     };

//     // Fetch order data when orderId changes
//     useEffect(() => {
//         fetchOrderData(orderId); // Pass orderId to the function
//     }, [orderId]); // Trigger the effect when orderId changes

//     return (
//         <OrderContext.Provider value={{ orderId, setOrderId, orders, order }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };

// // Custom Hook to use Order Context
// export const useOrder = () => {
//     return useContext(OrderContext);
// };




 // Fetch order data for the user
    // const fetchOrdersByUserId = async (userId) => {
    //     if (!userId) return; // Exit if userId is not defined
    
    //     setLoading(true);
    //     setError(null);
    
    //     try {
    //         const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    //             },
    //         });
    //         if (response.data.success) {
    //             setOrders(response.data.orders);
    //         } else {
    //             console.error('Failed to fetch orders:', response.data.message);
    //             setError('Failed to fetch orders');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //         setError('Error occurred while fetching orders.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    

    // // Fetch orders when the authenticated user changes
    // useEffect(() => {
    //     if (user && user._id) {
    //         fetchOrdersByUserId(user._id); // Pass user._id to the function
    //     }
    // }, [user]); // Trigger effect when user changes


    
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext'; // Assuming AuthContext contains the authenticated user

// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//     const { user } = useAuth(); // Access authenticated user from AuthContext
//     const [orders, setOrders] = useState([]); // State to hold orders
//     const [loading, setLoading] = useState(false); // Loading state
//     const [error, setError] = useState(null); // Error state

   

//     const fetchOrderById = async (orderId) => {
//         if (!orderId) {
//             console.error('Order ID is not defined');
//             return; // Exit if orderId is not defined
//         }
    
//         setLoading(true);
//         setError(null);
    
//         try {
//             const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Authorization token
//                 },
//             });
//             if (response.status === 200 && response.data) {
//                 setOrders([response.data.order]); // Assuming the response contains the order details
//             } else {
//                 console.error('Failed to fetch order:', response.data.message || 'Unknown error');
//                 setError('Failed to fetch order');
//             }
//         } catch (error) {
//             console.error('Error fetching order details:', error.response?.data || error.message);
//             setError('Error occurred while fetching the order.');
//         } finally {
//             setLoading(false);
//         }
//     };
//       // Fetch an order when the component mounts (if you know the orderId)
//       useEffect(() => {
//         const orderId = '66f7d3a76c07a99aa2268542'; // Replace with actual orderId (can come from route params)
//         fetchOrderById(orderId);
//     }, []); // Empty dependency array so it runs once on mount

      
//     return (
//         <OrderContext.Provider value={{ orders, loading, error }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };

// // Custom Hook to use Order Context
// export const useOrder = () => {
//     return useContext(OrderContext);
// };



import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming AuthContext contains the authenticated user

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { user } = useAuth(); // Access authenticated user from AuthContext
    const [orders, setOrders] = useState([]); // State to hold orders
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchOrderById = async (userId) => {
        if (!userId) {
            console.error('user ID is not defined');
            return; // Exit if orderId is not defined
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/orders/user${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Authorization token
                },
            });
            if (response.status === 200 && response.data) {
                setOrders([response.data.order]); // Assuming the response contains the order details
            } else {
                console.error('Failed to fetch order:', response.data.message || 'Unknown error');
                setError('Failed to fetch order');
            }
        } catch (error) {
            console.error('Error fetching order details:', error.response?.data || error.message);
            setError('Error occurred while fetching the order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, loading, error, fetchOrderById }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom Hook to use Order Context
export const useOrder = () => {
    return useContext(OrderContext);
};
