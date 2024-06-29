import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const withAdminProtection = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const verifyAdmin = async () => {
        const data = authService.getCurrentUser();
        if (data.user && data.user.admin) {
          setIsAdmin(true);
        } else {
          navigate(data.user ? "/" : "/login", { replace: true });
        }
      };
      verifyAdmin();
    }, [navigate]);

    // Render the component only if isAdmin is true
    return isAdmin ? <WrappedComponent {...props} /> : null;
  };
};

export default withAdminProtection;
