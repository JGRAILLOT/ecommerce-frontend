// src/components/withAdminProtection.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import userService from "../services/userService";

const withAdminProtection = (WrappedComponent) => {
  return (props) => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      const verifyAdmin = async () => {
        if (isAuthenticated) {
          const userProfile = await userService.getUserProfile(user._id);
          if (!userProfile.admin) {
            navigate("/", { replace: true }); // Redirect to home if not an admin
          }
        } else {
          navigate("/login", { replace: true }); // Redirect to login if not authenticated
        }
      };
      verifyAdmin();
    }, [isAuthenticated, user, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAdminProtection;
