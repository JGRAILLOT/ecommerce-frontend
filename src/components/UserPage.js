// src/components/UserPage.js
import React, { useState, useEffect, useContext } from "react";
import userService from "../services/userService";
import { AuthContext } from "../contexts/AuthContext";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await userService.getUserProfile(user._id);
      setProfile({
        name: userProfile.name,
        email: userProfile.email,
        password: "",
      });
    };
    fetchUserProfile();
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userService.updateUserProfile(user._id, profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
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
