import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <SearchBar />
        {user && (
          <>
            {!isAdmin && (
              <>
                <Link to="/orders" className={styles.navLink}>
                  My Orders
                </Link>
                <Link to="/cart" className={styles.navLink}>
                  My Cart
                </Link>
              </>
            )}
            {isAdmin && (
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
          </>
        )}
        {
          <>
            {user ? (
              <button className={styles.navLink} onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className={styles.navLink}>
                  Login
                </Link>
                <Link to="/signup" className={styles.navLink}>
                  SignUp
                </Link>
              </>
            )}
          </>
        }
      </nav>
    </header>
  );
};

export default Header;
