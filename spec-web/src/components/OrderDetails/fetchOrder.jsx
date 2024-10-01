import React from 'react';
import { useOrder } from '../../orderContext';

const FetchOrderButton = () => {
    const { setOrderId } = useOrder();

    const handleFetchOrder = () => {
        const orderId = '123456'; // Replace this with the actual order ID from your application logic
        setOrderId(orderId); // This will trigger the fetch in the OrderContext
    };

    return (
        <button onClick={handleFetchOrder}>Fetch Order</button>
    );
};

export default FetchOrderButton;
