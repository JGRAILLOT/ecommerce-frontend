// src/services/orderService.js
import makeRequest from "../Api";

const getUserOrders = async (userId) => {
  const response = await makeRequest("GET", `/orders/${userId}`);
  return response.data;
};

const getAllOrders = async () => {
  const response = await makeRequest("GET", `/orders/all`);
  return response.data;
};

const createOrder = async (orderData) => {
  const response = await makeRequest("POST", `/orders`, orderData);
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await makeRequest("DELETE", `/orders/${orderId}`);
  return response.data;
};

const orderService = { getUserOrders, getAllOrders, createOrder, deleteOrder };

export default orderService;
