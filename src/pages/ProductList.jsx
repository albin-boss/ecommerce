import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./css/ProudctList.css";

const ITEMS_PER_PAGE = 5;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductCard = ({ product, handleAddToCart, handleWishlistToggle, isWishlisted, view }) => {
  return (
    <div className={`custom-product-card ${view}`}>
      <img src={product.image1} alt={product.name} className="custom-product-image" />
      <div className="custom-product-details">
        <h2 className="custom-product-name">{product.name}</h2>
        <div className="custom-product-rating">
          <span className="custom-rating-value">⭐ {product.rating}</span>
        </div>
        <p className="custom-product-review">"{product.description}"</p>
        <p className="custom-product-meta">₹{product.price}</p>
        <p className="custom-product-meta">Category: {product.category}</p>
        <div className="custom-product-actions">
          <button className="custom-add-to-cart" onClick={() => handleAddToCart(product.id)}>
            Add to Cart
          </button>
          <button className="custom-wishlist-btn" onClick={() => handleWishlistToggle(product.id)}>
            {isWishlisted ? "💔 Remove" : "💖 Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [page, setPage] = useState(1);
  const query = useQuery();
  const categoryFromURL = query.get("category");

  useEffect(() => {
    axios.get("http://localhost:8005/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));

    axios.get("http://localhost:8005/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));

    const employeeId = localStorage.getItem("employeeId");
    if (employeeId) {
      axios.get(`http://localhost:8005/api/wishlist/${employeeId}`)
        .then(res => {
          const productIds = res.data.map(item => item.productId);
          setWishlist(productIds);
        })
        .catch(err => console.error("Error loading wishlist:", err));
    }
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      setCategoryFilter(categoryFromURL);
    }
  }, [categoryFromURL]);

  const applyFilters = () => {
    let filtered = [...products];

    if (categoryFilter !== "All") {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const handleAddToCart = async (productId) => {
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) return alert("Please log in to add items to cart.");

    try {
      await axios.post("http://localhost:8005/api/cart", {
        employeeId,
        productId,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const handleWishlistToggle = async (productId) => {
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) return alert("Please log in to use wishlist.");

    const isAlreadyWishlisted = wishlist.includes(productId);

    try {
      if (isAlreadyWishlisted) {
        await axios.delete("http://localhost:8005/api/wishlist", {
          data: { employeeId, productId },
        });
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        await axios.post("http://localhost:8005/api/wishlist", { employeeId, productId });
        setWishlist(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      alert("Something went wrong!");
    }
  };

  const filteredProducts = applyFilters();
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
        <div style={{ padding: "0 1rem" }}>
          <button className="custom-back-button" onClick={() => window.history.back()}>
            🔙 Back
          </button>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="custom-search-bar"
        />
        <button className="custom-view-cart-btn" onClick={() => window.location.href = "/cart"}>
          🛒 View Cart
        </button>
      </div>

      {/* Filters + View Mode Toggle */}
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
            <label>Sort</label>
            <select value={sortType} onChange={(e) => { setSortType(e.target.value); setPage(1); }}>
              <option value="">None</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="ratingHighLow">Rating: High to Low</option>
            </select>
          </div>

          <div className="custom-filter-group">
            <label>View Mode</label>
            <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
              <option value="grid">Grid</option>
              <option value="list">List</option>
            </select>
          </div>
        </aside>

        {/* Products Section */}
        <div className={`custom-product-main ${viewMode}`}>
          <h1 className="custom-main-title">
            {categoryFilter === "All" ? "Top Deals on Mobile Phones" : `Products in ${categoryFilter}`}
          </h1>

          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleWishlistToggle={handleWishlistToggle}
              isWishlisted={wishlist.includes(product.id)}
              view={viewMode}
            />
          ))}

          {/* Pagination */}
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
    </div>
  );
}
