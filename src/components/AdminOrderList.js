// src/components/AdminOrderList.js
import React, { useState, useEffect } from "react";
import orderService from "../services/orderService";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await orderService.getAllOrders();
        if (Array.isArray(allOrders)) {
          setOrders(allOrders);
        } else {
          setOrders([]); // Ensure orders is always an array.
          console.error(
            "Expected an array of orders, but received:",
            allOrders
          );
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]); // Fallback to an empty array in case of error.
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    await orderService.deleteOrder(orderId);
    setOrders(orders.filter((order) => order._id !== orderId));
  };

  const filteredOrders =
    filter.length > 0
      ? orders.filter((order) =>
          order.address.toLowerCase().includes(filter.toLowerCase())
        )
      : orders;

  return (
    <div>
      <h1>Admin Orders List</h1>
      <input
        type="text"
        placeholder="Filter by address"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredOrders.map((order) => (
          <li key={order._id}>
            <p>Address: {order.address}</p>
            <p>Items:</p>
            <ul>
              {order.items &&
                order.items.map((item) => (
                  <li key={item.productId}>
                    {item.productName} - {item.productPrice}
                  </li>
                ))}
            </ul>
            <button onClick={() => handleDelete(order._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderList;
