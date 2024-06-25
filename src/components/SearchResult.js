import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productService from "../services/productService";

const SearchResult = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams(location.search);
      const name = params.get("name") || "";
      const category = params.get("category") || "";
      const minPrice = params.get("minPrice") || "";
      const maxPrice = params.get("maxPrice") || "";

      const response = await productService.searchProducts({
        name,
        category,
        minPrice,
        maxPrice,
      });
      setProducts(response);
    };

    fetchProducts();
  }, [location.search]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
