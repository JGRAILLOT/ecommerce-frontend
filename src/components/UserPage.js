// src/components/UserPage.js
import React, { useState } from "react";
import userService from "../services/userService";
import authService from "../services/authService";

const UserPage = () => {
  const initialData = authService.getCurrentUser();
  const [profile, setProfile] = useState({
    username: initialData.user.username,
    email: initialData.user.email,
    password: "", // Manage password as part of state
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      username: profile.username,
      email: profile.email,
      ...(profile.password && { password: profile.password }), // Only add password to payload if it's not empty
    };
    await userService.updateUserProfile(initialData.user.id, updateData);

    // Optionally reset the password field after successful update
    setProfile((prev) => ({ ...prev, password: "" }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserPage;
