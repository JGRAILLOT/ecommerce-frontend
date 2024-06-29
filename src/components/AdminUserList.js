// src/components/AdminUserList.js
import React, { useState, useEffect } from "react";
import userService from "../services/userService";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userService.getUsers();
        if (Array.isArray(allUsers)) {
          setUsers(allUsers);
        } else {
          console.error("Invalid data type received:", allUsers);
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Fallback to an empty array on error
      }
    };
    fetchUsers();
  }, []);

  const handleBan = async (userId) => {
    const result = await userService.updateUserProfile(userId, {
      banned: true,
    });
    if (result.success) {
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, banned: true } : user
        )
      );
    }
  };

  const handleUnban = async (userId) => {
    const result = await userService.updateUserProfile(userId, {
      banned: false,
    });
    if (result.success) {
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, banned: false } : user
        )
      );
    }
  };

  const handleDelete = async (userId) => {
    const result = await userService.deleteUser(userId);
    if (result.success) {
      setUsers(users.filter((user) => user._id !== userId));
    }
  };

  return (
    <div>
      <h1>Admin Users List</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.username} - {user.email} -{" "}
              {user.banned ? "Banned" : "Active"}
              {user.banned ? (
                <button onClick={() => handleUnban(user._id)}>Unban</button>
              ) : (
                <button onClick={() => handleBan(user._id)}>Ban</button>
              )}
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminUserList;
