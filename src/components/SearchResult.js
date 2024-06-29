import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productService from "../services/productService";

const SearchResult = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      const params = new URLSearchParams(location.search);

      // Filter parameters to exclude empty ones
      const searchParams = {};
      for (let param of params) {
        const [key, value] = param;
        if (value.trim()) {
          // Check if the parameter value is not just whitespace
          searchParams[key] = value;
        }
      }

      try {
        if (Object.keys(searchParams).length > 0) {
          // Only make the request if there are valid parameters
          const response = await productService.searchProducts(searchParams);
          setProducts(response);
        } else {
          setProducts([]);
          setError("No search parameters provided.");
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error("Search error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]); // React to changes in search query

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Search Results</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price} - {product.category}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResult;
