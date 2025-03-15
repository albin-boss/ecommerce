import React, { useState } from "react";
import "./css/pcard.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">E-Commerce</h1>
      <ul className="navbar-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Cart</a></li>
      </ul>
    </nav>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const categories = ["Headphones", "Speakers", "Accessories", "Smartwatches", "Gaming"];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="sidebar-toggle">
        {isOpen ? "X" : "☰"}
      </button>
      {isOpen && (
        <>
          <h3 className="sidebar-title">Categories</h3>
          <ul className="sidebar-list">
            {categories.map((category, index) => (
              <li key={index} className="sidebar-item">{category}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const ReviewSection = () => {
  const reviews = [
    { name: "John Doe", rating: 5, comment: "Excellent product!" },
    { name: "Jane Smith", rating: 4, comment: "Good for the price." },
    { name: "Alex Brown", rating: 3, comment: "Decent product." }
  ];

  return (
    <div className="reviews">
      <h3 className="reviews-title">Customer Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <p className="review-name">{review.name}</p>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

const SimilarProducts = () => {
  const products = [
    { name: "TRIGGR Air X2", price: "₹799", image: "image1.jpg" },
    { name: "TRIGGR Bass Z5", price: "₹999", image: "image2.jpg" },
    { name: "TRIGGR Elite X6", price: "₹1,199", image: "image3.jpg" }
  ];

  return (
    <div className="similar-products">
      <h3 className="similar-products-title">Similar Products</h3>
      {products.map((product, index) => (
        <div key={index} className="similar-product-card">
          <img src={product.image} alt={product.name} className="similar-product-image" />
          <p className="similar-product-name">{product.name}</p>
          <p className="similar-product-price">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

const ProductCard = () => {
  return (
    <div className="product-page">
      <Sidebar />
      <div className="product-container">
        <Navbar />
        <div className="product-content">
          <div className="product-card">
            <img src="product-image.jpg" alt="TRIGGR Kraken X4" className="product-image" />
            <h2 className="product-title">TRIGGR Kraken X4</h2>
            <p className="product-description">13mm Drivers, 40ms Latency, ENC, 60H Battery</p>
            <p className="product-price">₹899 <span className="product-discount">₹3,999</span> (77% OFF)</p>
            <div className="product-actions">
              <button className="button primary">Add to Cart</button>
              <button className="button secondary">Buy Now</button>
            </div>
            <ReviewSection />
          </div>
          <SimilarProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
