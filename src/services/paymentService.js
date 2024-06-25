// src/services/paymentService.js
import makeRequest from "../Api";

const createPayPalPayment = async (data) => {
  return await makeRequest("POST", "/payment/paypal", data);
};

const executePayPalPayment = async (data) => {
  return await makeRequest("POST", "/payment/paypal/execute", data);
};

const createStripePayment = async (data) => {
  return await makeRequest("POST", "/payment/stripe", data);
};

const paymentService = {
  createPayPalPayment,
  executePayPalPayment,
  createStripePayment,
};

export default paymentService;
