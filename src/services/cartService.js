// src/services/cartService.js
import makeRequest from "../Api";

const getCartItems = async (userId) => {
  return await makeRequest("GET", `/cart/${userId}`);
};

const addToCart = async (userId, productId) => {
  return await makeRequest("POST", `/cart`, { userId, productId });
};

const removeFromCart = async (userId, productId) => {
  return await makeRequest("DELETE", `/cart/${userId}/${productId}`);
};

const clearCart = async (userId) => {
  return await makeRequest("DELETE", `/cart/clear/${userId}`);
};

const cartService = { getCartItems, addToCart, removeFromCart, clearCart };

export default cartService;
