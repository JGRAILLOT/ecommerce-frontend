// src/components/OrderList.js
import React, { useState, useEffect, useContext } from "react";
import orderService from "../services/orderService";
import { AuthContext } from "../contexts/AuthContext";

const OrderList = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await orderService.getUserOrders(user._id);
      setOrders(userOrders);
    };
    fetchOrders();
  }, [user]);

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
