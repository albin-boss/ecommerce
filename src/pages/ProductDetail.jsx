import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8005/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error("Error fetching product:", err);
        alert("Product not found");
        navigate("/products");
      });
  }, [id, navigate]);
  const handleAddToCart = async () => {
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) return alert("Please log in to add items to cart.");
  
    try {
      await axios.post("http://localhost:8005/api/cart", {
        employeeId,
        productId: product.id,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add product to cart.");
    }
  };
  

  if (!product) return <div className="custom-loader">Loading product details...</div>;

  return (
    <div className="custom-product-detail-container">
      <button className="custom-back-button" onClick={() => navigate(-1)}>🔙 Back</button>

      <div className="custom-product-detail-card">
        <img src={product.image1} alt={product.name} className="custom-detail-image" />
        <div className="custom-detail-info">
          <h1 className="custom-detail-title">{product.name}</h1>
          <p className="custom-detail-rating">⭐ {product.rating}</p>
          <p className="custom-detail-price">₹{product.price}</p>
          <p className="custom-detail-category">Category: {product.category}</p>
          <p className="custom-detail-description">{product.description}</p>
          <p className="custom-detail-specs">{product.specification}</p>
          <button className="custom-add-to-cart" onClick={handleAddToCart}>🛒 Add to Cart</button>

        </div>
      </div>
    </div>
  );
}
