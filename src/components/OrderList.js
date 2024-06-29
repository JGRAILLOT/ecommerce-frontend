// src/components/OrderList.js
import React, { useState, useEffect } from "react";
import orderService from "../services/orderService";
import authService from "../services/authService";

const OrderList = () => {
  const data = authService.getCurrentUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await orderService.getUserOrders(data.user.id);
      setOrders(userOrders);
    };
    fetchOrders();
  }, [data]);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.productName} - {order.productPrice} - {order.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
