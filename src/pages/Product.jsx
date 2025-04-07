import React, { useState } from "react";
import "./css/ProudctList.css"; // Custom CSS file

const allProducts = [
  {
    id: 1,
    name: "vivo T4x 5G (Pronto Purple, 128 GB)",
    price: 14999,
    originalPrice: 19499,
    discount: "23% off",
    rating: 4.5,
    reviews: 873,
    customerReview: "Amazing performance and battery life!",
    features: [
      "8 GB RAM | 128 GB ROM",
      "6.72 inch Display",
      "50MP + 2MP | 8MP Front Camera",
      "6500 mAh Battery",
      "Dimensity 7300 5G Processor",
    ],
    category: "Smartphones",
    ram: "8 GB",
    rom: "128 GB",
    discountPercentage: 23,
    image: "/vivo-t4x.png",
  },
  {
    id: 2,
    name: "MOTOROLA g35 5G (Guava Red, 128 GB)",
    price: 9999,
    originalPrice: 12499,
    discount: "20% off",
    rating: 4.2,
    reviews: 2636,
    customerReview: "Great value for the price!",
    features: [
      "4 GB RAM | 128 GB ROM | Expandable Upto 1 TB",
      "6.72 inch Full HD+ Display",
      "50MP + 8MP | 16MP Front Camera",
      "5000 mAh Battery",
      "T760 Processor",
    ],
    category: "Smartphones",
    ram: "4 GB",
    rom: "128 GB",
    discountPercentage: 20,
    image: "/moto-g35.png",
  },
  {
    id: 3,
    name: "Samsung Galaxy M14 5G (Berry Blue, 128 GB)",
    price: 13499,
    originalPrice: 16499,
    discount: "18% off",
    rating: 4.4,
    reviews: 1574,
    customerReview: "Solid phone with great battery and performance.",
    features: [
      "6 GB RAM | 128 GB ROM",
      "6.6 inch PLS LCD Display",
      "50MP + 2MP + 2MP | 13MP Front Camera",
      "6000 mAh Battery",
      "Exynos 1330 Processor",
    ],
    category: "Smartphones",
    ram: "6 GB",
    rom: "128 GB",
    discountPercentage: 18,
    image: "/samsung-m14.png",
  }
];

const ITEMS_PER_PAGE = 5;

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <div className="product-rating">
          <span className="rating-value">⭐ {product.rating}</span>
          <span className="rating-reviews">({product.reviews} Reviews)</span>
        </div>
        <p className="product-review">"{product.customerReview}"</p>
        <ul className="product-features">
          {product.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{product.originalPrice}</span>
          <span className="discount">{product.discount}</span>
        </div>
        <p className="product-meta">Category: {product.category}</p>
        <p className="product-meta">RAM: {product.ram}</p>
        <p className="product-meta">ROM: {product.rom}</p>
        <p className="product-meta">Discount: {product.discountPercentage}%</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default function ProductList() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="product-page">
      <aside className="sidebar">
        <h2 className="sidebar-title">Filters</h2>
        <div className="filter-group">
          <label>Category</label>
          <select>
            <option>All</option>
            <option>Smartphones</option>
            <option>Tablets</option>
            <option>Accessories</option>
          </select>
        </div>
        <div className="filter-group">
          <label>RAM</label>
          <select>
            <option>All</option>
            <option>4 GB</option>
            <option>6 GB</option>
            <option>8 GB</option>
          </select>
        </div>
        <div className="filter-group">
          <label>ROM</label>
          <select>
            <option>All</option>
            <option>64 GB</option>
            <option>128 GB</option>
            <option>256 GB</option>
          </select>
        </div>
        <button className="apply-filters">Apply Filters</button>
      </aside>

      <div className="product-main">
        <h1 className="main-title">Top Deals on Mobile Phones</h1>
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-wrapper">
            <ProductCard product={product} />
          </div>
        ))}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`pagination-btn ${page === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
