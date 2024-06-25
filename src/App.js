import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import AdminProductsList from "./components/AdminProductList";
import AdminUserList from "./components/AdminUserList";
import OrderList from "./components/OrderList";
import CartList from "./components/CartList";
import LoginPage from "./components/LoginPage";
import SignPage from "./components/SignPage";
import UserPage from "./components/UserPage";
import SearchResult from "./components/SearchResult";
import Header from "./components/Header";
import withAdminProtection from "./components/withAdminProtection";
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/admin/products"
          element={withAdminProtection(<AdminProductsList />)}
        />
        <Route
          path="/admin/users"
          element={withAdminProtection(<AdminUserList />)}
        />
        <Route
          path="/admin/orders"
          element={withAdminProtection(<OrderList />)}
        />
        <Route path="/cart" element={<CartList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
