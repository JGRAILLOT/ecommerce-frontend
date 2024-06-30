// src/services/productService.js
import makeRequest from "../Api";

const getProducts = async () => {
  return await makeRequest("GET", "/products");
};

const getProduct = async (id) => {
  return await makeRequest("GET", `/products/${id}`);
};

const createProduct = async (product) => {
  return await makeRequest("POST", "/products", product);
};

const updateProduct = async (id, product) => {
  return await makeRequest("PUT", `/products/${id}`, product);
};

const deleteProduct = async (id) => {
  return await makeRequest("DELETE", `/products/${id}`);
};

const searchProducts = async (data) => {
  return await makeRequest("GET", "/products/search", data);
};

const getPopularProducts = async () => {
  return await makeRequest("GET", "/products/popular");
};

const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getPopularProducts,
};

export default productService;
