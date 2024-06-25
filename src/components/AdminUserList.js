// src/components/AdminUserList.js
import React, { useState, useEffect } from "react";
import userService from "../services/userService";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await userService.getUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const handleBan = async (userId) => {
    await userService.updateUserProfile(userId, { banned: true });
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, banned: true } : user
      )
    );
  };

  const handleUnban = async (userId) => {
    await userService.updateUserProfile(userId, { banned: false });
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, banned: false } : user
      )
    );
  };

  const handleDelete = async (userId) => {
    await userService.deleteUser(userId);
    setUsers(users.filter((user) => user._id !== userId));
  };

  return (
    <div>
      <h1>Admin Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.banned ? "Banned" : "Active"}
            <button onClick={() => handleBan(user._id)} disabled={user.banned}>
              Ban
            </button>
            <button
              onClick={() => handleUnban(user._id)}
              disabled={!user.banned}
            >
              Unban
            </button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserList;
