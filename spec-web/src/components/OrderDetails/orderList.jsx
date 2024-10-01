import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrdersList = ({ orders }) => {
  const [visibleOrders, setVisibleOrders] = useState(3); // Initial number of visible orders

  const showMoreOrders = () => {
    setVisibleOrders(orders.length); // Show all orders
  };

  const showLessOrders = () => {
    setVisibleOrders(3); // Show only the latest 3 orders
  };

  const hasMoreOrders = orders.length > visibleOrders; // Check if there are more orders to display

  return (
    <div>
      {orders.length > 0 ? (
        <ul className="bg-white text-black p-4 rounded-md">
          {orders.slice(0, visibleOrders).map((order) => ( // Slice orders array to show limited number
            <li key={order._id} className="mb-2">
              <Link
                to={`/orders/${order._id}`} // Correctly route to the order details page
                className="text-blue-500 hover:underline"
              >
                {/* Display order number, product name, and order date */}
                Order Number: {order.orderNumber || `#${order._id.substring(0, 8)}`} - 
                {order.items.length > 0 && order.items[0].productId ? ` ${order.items[0].productId.name}` : ''}
                {order.orderDate ? ` - Order Date: ${new Date(order.orderDate).toLocaleDateString()}` : ''}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      {/* Show More / Show Less Button */}
      {orders.length > 3 && (
        <button
          onClick={hasMoreOrders ? showMoreOrders : showLessOrders} // Toggle between showing more or less
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {hasMoreOrders ? 'Show More Orders' : 'Show Less'}
        </button>
      )}
    </div>
  );
};

export default OrdersList;
