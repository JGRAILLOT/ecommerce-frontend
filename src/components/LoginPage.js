import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setIsAdmin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(email, password);
      setUser(user);
      setIsAdmin(user.admin);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
