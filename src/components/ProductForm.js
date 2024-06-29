import React, { useState, useEffect } from "react";
import productService from "../services/productService";

const ProductForm = ({ productId, onSave }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    details: "",
    category: "",
  });
  const [file, setFile] = useState(null); // New state for handling file input

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const fetchedProduct = await productService.getProduct(productId);
        setProduct({
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          details: fetchedProduct.details,
          category: fetchedProduct.category,
        });
        // Note: Image file handling is not required here
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Handle file input separately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("details", product.details);
    formData.append("category", product.category);
    if (file) {
      formData.append("image", file); // Only append file if it exists
    }

    if (productId) {
      await productService.updateProduct(productId, formData);
    } else {
      await productService.createProduct(formData);
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
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Picture</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
