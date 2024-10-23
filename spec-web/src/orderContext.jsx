import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { user } = useAuth(); 
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const fetchOrderById = async (userId) => {
        if (!userId) {
            console.error('user ID is not defined');
            return; 
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/orders/user${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });
            if (response.status === 200 && response.data) {
                setOrders([response.data.order]); 
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
