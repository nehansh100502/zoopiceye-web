// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const OrderDetails = () => {
//   const { orderId } = useParams(); // Get the orderId from the URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const token = localStorage.getItem('userToken');
//         const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrder(response.data); // Assuming the response contains the order details
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching order details:', err);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) {
//     return <div>Loading order details...</div>;
//   }

//   if (!order) {
//     return <div>Order not found.</div>;
//   }

//   const { street, city, state, zip } = order.shippingAddress || {};

//   return (
//    <>
//    <h2 className='font-bold mt-28 text-center font-serif text-[#2fd5cc] text-2xl'>Full Order Details</h2>
//     <div className="order-details mt-2 text-center">
//       <h2>Order ID: {order._id}</h2>
//       <p>Status: {order.status}</p>
//       <p>Total Amount: ${order.totalAmount}</p>

//       {/* Ensure the shipping address object is properly destructured and rendered */}
//       <p>Shipping Address:</p>
//       <div>
//         {street && <p>Street: {street}</p>}
//         {city && <p>City: {city}</p>}
//         {state && <p>State: {state}</p>}
//         {zip && <p>Zip: {zip}</p>}
//       </div>

//       <h3>Items:</h3>
//       <ul>
//         {order.items.map((item, index) => (
//           <li key={index}>
//             {item.name} - {item.quantity} x ${item.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//    </>
//   );
// };

// export default OrderDetails;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:4000/api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data); // Assuming the response contains the order details
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  const { street, city, state, zip } = order.shippingAddress || {};

  return (
    <>
      <h2 className='font-bold mt-28 text-center font-serif text-[#1ac5bdc3] text-2xl'>Full Order Details</h2>
      <div className="order-details mt-4 text-center">
        <table className="table-auto w-full border border-gray-300 mt-4 mx-auto max-w-3xl bg-white shadow-lg">
          <tbody>
            {/* Order Info */}
            <tr className="border-b bg-gray-100">
              <td className="font-bold p-4 text-left bg-[#13ada5] text-white">Order ID</td>
              <td className="p-4">{order._id}</td>
            </tr>
            <tr className="border-b">
              <td className="font-bold p-4 text-left bg-[#08aaa2] text-white">Status</td>
              <td className="p-4">{order.status}</td>
            </tr>

            {/* Shipping Address */}
            <tr className="border-b bg-gray-100">
              <td className="font-bold p-4 text-left bg-[#10a29be6] text-white">Shipping Address</td>
              <td className="p-4">
                {street && <p>Street: {street}</p>}
                {city && <p>City: {city}</p>}
                {state && <p>State: {state}</p>}
                {zip && <p>Zip: {zip}</p>}
              </td>
            </tr>

            {/* Items */}
            <tr className="border-b">
              <td className="font-bold p-4 text-left bg-[#26b0a9f8] text-white">Items</td>
              <td className="p-4">
                <table className="table-auto w-full border border-gray-300 bg-white">
                  <thead>
                    <tr>
                      <th className="border-b p-4 text-left bg-[#ffed4a]">Item Name</th>
                      <th className="border-b p-4 text-left bg-[#ffed4a]">Quantity</th>
                      <th className="border-b p-4 text-left bg-[#ffed4a]">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-b bg-gray-50">
                        <td className="p-4">{item.name}</td>
                        <td className="p-4">{item.quantity}</td>
                        <td className="p-4">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Total Amount */}
                  <tfoot>
                    <tr className="border-t bg-gray-100">
                      <td className="font-bold p-4 text-left bg-[#2fd5cc] text-white">Total Amount</td>
                      <td colSpan="2" className="p-4">₹{order.totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;
