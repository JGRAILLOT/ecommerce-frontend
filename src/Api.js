//Api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: BASE_URL,
});

// Helper function to get the stored token
const getToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

export const makeRequest = async (method, url, data = null, params = null) => {
  const token = getToken(); // Retrieve the token from local storage

  // Setting up the headers object conditionally
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await api({
      method,
      url,
      data,
      params,
      headers, // Include the headers in the Axios request
    });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export default makeRequest;
