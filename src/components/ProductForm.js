// src/components/ProductForm.js
import React, { useState, useEffect } from "react";
import productService from "../services/productService";

const ProductForm = ({ productId, onSave }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    details: "",
    category: "",
    picture: "",
  });

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const fetchedProduct = await productService.getProduct(productId);
        setProduct(fetchedProduct);
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productId) {
      await productService.updateProduct(productId, product);
    } else {
      await productService.createProduct(product);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Details</label>
        <input
          type="text"
          name="details"
          value={product.details}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="number"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Picture</label>
        <input
          type="file"
          name="picture"
          value={product.picture}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
