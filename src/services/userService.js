// src/services/userService.js
import makeRequest from "../Api";

const getUsers = async () => {
  const response = await makeRequest("GET", `/users/`);
  return response;
};

const getUserProfile = async (userId) => {
  const response = await makeRequest("GET", `/users/profile/${userId}`);
  console.log(response);
  return response;
};

const updateUserProfile = async (userId, userData) => {
  const response = await makeRequest(
    "PUT",
    `/users/profile/${userId}`,
    userData
  );
  return response;
};

const deleteUser = async (userId) => {
  const response = await makeRequest("DELETE", `/users/${userId}`);
  return response;
};

const userService = { getUsers, getUserProfile, updateUserProfile, deleteUser };

export default userService;
