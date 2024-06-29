// src/services/authService.js
import makeRequest from "../Api";

const login = async (email, password) => {
  try {
    const data = await makeRequest("POST", "/auth/login", {
      email,
      password,
    });
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (username, email, password) => {
  try {
    const data = await makeRequest("POST", "/auth/register", {
      username,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
const authService = { login, register, logout, getCurrentUser };

export default authService;
