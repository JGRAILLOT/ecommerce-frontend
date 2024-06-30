import React, { useState, useEffect } from "react";
import orderService from "../services/orderService";
import authService from "../services/authService";

const OrderList = () => {
  const data = authService.getCurrentUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const userOrders = await orderService.getUserOrders(data.user.id);
        setOrders(userOrders);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [data.user.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              {order.productName} - ${order.productPrice} - {order.address}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
