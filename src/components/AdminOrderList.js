// src/components/AdminOrderList.js
import React, { useState, useEffect } from "react";
import orderService from "../services/orderService";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await orderService.getAllOrders();
      setOrders(allOrders);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    await orderService.deleteOrder(orderId);
    setOrders(orders.filter((order) => order._id !== orderId));
  };

  const filteredOrders = orders.filter((order) =>
    order.address.toLowerCase().includes(filter.toLowerCase())
  );

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
              {order.items.map((item) => (
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
