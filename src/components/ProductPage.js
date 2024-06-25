import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";
import cartService from "../services/cartService";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProduct(id);
        setProduct(productData);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add products to the cart.");
      return;
    }

    try {
      await cartService.addToCart(user.id, product.id, quantity);
      alert("Product added to cart");
      navigate("/cart");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {product && (
        <>
          <h1>{product.name}</h1>
          <img src={`/${product.image}`} alt={product.name} />
          <p>{product.details}</p>
          <p>Price: ${product.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default ProductPage;
