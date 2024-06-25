import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import productService from "../services/productService";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await productService.getPopularProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching popular products", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      {products.map((product) => (
        <div key={product._id}>
          <img src={product.picture} alt={product.name} />
          <p className="legend">{product.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
