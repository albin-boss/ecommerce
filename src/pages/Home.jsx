// src/Home.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaCommentDots, FaTimes } from "react-icons/fa";
import Footer from "./Footer";
import "./home.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function OffersGrid() {
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8005/api/offers")
      .then(response => {
        setOffersData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching offers:", error);
        setLoading(false);
      });
  }, []);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    background: "#444",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "4px",
    objectFit: "cover",
    marginBottom: "12px",
  };

  const titleStyle = {
    margin: "8px 0 4px",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#fff",
  };

  const priceStyle = {
    margin: 0,
    color: "#00e676",
    fontWeight: "bold",
    fontSize: "1.1rem",
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <p style={{ color: "#fff", fontSize: "1.2rem" }}>Loading offers...</p>
      ) : offersData.length === 0 ? (
        <p style={{ color: "#fff", fontSize: "1.2rem" }}>No offers available</p>
      ) : (
        <div style={gridStyle}>
          {offersData.map((offer) => (
            <div style={cardStyle} key={offer.id}>
              <img
                style={imgStyle}
                src={offer.image}
                alt={offer.productName}
              />
              <h3 style={titleStyle}>{offer.productName}</h3>
              <p style={priceStyle}>₹{offer.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8005/api/categories")
      .then(response => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>PREMIUM</h1>
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search for Products, Brands and More" />
        </div>
        <div className="actions">
          <button className="button" onClick={() => navigate("/login")}>
            <FaUser /> Login
          </button>
          <button className="button" onClick={() => navigate("/cart")}>
            <FaShoppingCart /> Cart
          </button>
        </div>
      </header>

      {/* Categories Navigation */}
      <nav>
        {loadingCategories ? (
          <p style={{ color: "#fff" }}>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p style={{ color: "#fff" }}>No categories found</p>
        ) : (
          categories.map(category => (
            <button key={category.id}>{category.name}</button>
          ))
        )}
      </nav>

      {/* Banner */}
      <div className="gallery-wrap">
        <div className="item item-1"></div>
        <div className="item item-2"></div>
        <div className="item item-3"></div>
        <div className="item item-4"></div>
        <div className="item item-5"></div>
      </div>

      {/* Categories Section */}
      <section className="offers">
        <h3>Shop by Category</h3>
        <div className="grid-container">
          {categories.length === 0 ? (
            <p style={{ color: "#fff" }}>No categories available</p>
          ) : (
            categories.map((category) => (
              <Link to="/login" className="item-link" key={category.id}>
                <div className="item-card">
                  <img src={category.image} alt={category.name} />
                  <h4>{category.name}</h4>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-grid-section">
        <h3>Today's Offers</h3>
        <OffersGrid />
      </section>

      {/* Chat Popup */}
      <button className="chat-icon" onClick={() => setIsChatOpen(true)}>
        <FaCommentDots />
      </button>
      {isChatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>Chat Support</h4>
            <button onClick={() => setIsChatOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <p>Hello! How can we assist you today?</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
