// src/services/cartService.js
import makeRequest from "../Api";

const getCartItems = async (userId) => {
  return await makeRequest("GET", `/cart/${userId}`);
};

const addToCart = async (productId, userId, quantity) => {
  return await makeRequest("POST", `/cart`, { productId, userId, quantity });
};

const removeFromCart = async (cartId) => {
  return await makeRequest("DELETE", `/cart/${cartId}`);
};

const clearCart = async (userId) => {
  return await makeRequest("DELETE", `/cart/clear/${userId}`);
};

const cartService = { getCartItems, addToCart, removeFromCart, clearCart };

export default cartService;
