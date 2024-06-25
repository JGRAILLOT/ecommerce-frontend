// src/components/AdminProductsList.js
import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import ProductForm from "./ProductForm";

const AdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await productService.deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleSave = () => {
    setSelectedProductId(null);
    const fetchProducts = async () => {
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  };

  return (
    <div>
      <h1>Admin Products List</h1>
      <button onClick={() => setSelectedProductId(null)}>
        Add New Product
      </button>
      <ProductForm productId={selectedProductId} onSave={handleSave} />
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price} - {product.category}
            <button onClick={() => setSelectedProductId(product._id)}>
              Edit
            </button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductsList;
