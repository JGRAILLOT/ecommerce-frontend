import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import SearchBar from "./SearchBar";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser?.user);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <SearchBar />
        {user && (
          <>
            <Link to="/orders" className={styles.navLink}>
              My Orders
            </Link>
            <Link to="/cart" className={styles.navLink}>
              My Cart
            </Link>
            {user.admin && (
              <>
                <Link to="/admin/products" className={styles.navLink}>
                  Admin Products
                </Link>
                <Link to="/admin/users" className={styles.navLink}>
                  Admin Users
                </Link>
                <Link to="/admin/orders" className={styles.navLink}>
                  Admin Orders
                </Link>
              </>
            )}
            <Link to="/user" className={styles.navLink}>
              Profile
            </Link>
            <button className={styles.navLink} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/signup" className={styles.navLink}>
              SignUp
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
