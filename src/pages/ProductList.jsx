import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ProudctList.css";

const ITEMS_PER_PAGE = 5;

const ProductCard = ({ product }) => {
  return (
    <div className="custom-product-card">
      <img src={product.image1} alt={product.name} className="custom-product-image" />
      <div className="custom-product-details">
        <h2 className="custom-product-name">{product.name}</h2>
        <div className="custom-product-rating">
          <span className="custom-rating-value">⭐ {product.rating}</span>
        </div>
        <p className="custom-product-review">"{product.description}"</p>
        <p className="custom-product-meta">₹{product.price}</p>
        <p className="custom-product-meta">Category: {product.category}</p>
        <button className="custom-add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8005/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));

    axios.get("http://localhost:8005/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const applyFilters = () => {
    let filtered = [...products];

    if (categoryFilter !== "All") {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (sortType === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === "ratingHighLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredProducts = applyFilters();
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="custom-product-page">
      <aside className="custom-sidebar">
        <h2 className="custom-sidebar-title">Filters</h2>

        <div className="custom-filter-group">
          <label>Category</label>
          <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
            <option value="All">All</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="custom-filter-group">
          <label>Sort By Price</label>
          <select value={sortType} onChange={(e) => { setSortType(e.target.value); setPage(1); }}>
            <option value="">None</option>
            <option value="priceLowHigh">Low to High</option>
            <option value="priceHighLow">High to Low</option>
          </select>
        </div>

        <div className="custom-filter-group">
          <label>Sort By Rating</label>
          <select value={sortType} onChange={(e) => { setSortType(e.target.value); setPage(1); }}>
            <option value="">None</option>
            <option value="ratingHighLow">High to Low</option>
          </select>
        </div>
      </aside>

      <div className="custom-product-main">
        <h1 className="custom-main-title">Top Deals on Mobile Phones</h1>
        {paginatedProducts.map((product) => (
          <div key={product.id} className="custom-product-wrapper">
            <ProductCard product={product} />
          </div>
        ))}
        <div className="custom-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`custom-pagination-btn ${page === i + 1 ? "custom-active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
