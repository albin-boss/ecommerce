import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/WishlistView.css";

export default function WishlistView() {
  const [wishlist, setWishlist] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const employeeId = localStorage.getItem("employeeId");
  const navigate = useNavigate();

  useEffect(() => {
    if (employeeId) {
      axios
        .get(`http://localhost:8005/api/wishlist/${employeeId}`)
        .then((response) => {
          setWishlist(response.data);
          fetchProductDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
        });
    }
  }, [employeeId]);

  const fetchProductDetails = async (wishlistItems) => {
    const details = {};
    for (let item of wishlistItems) {
      const { productId } = item;
      if (!details[productId]) {
        try {
          const res = await axios.get(`http://localhost:8005/api/products/${productId}`);
          details[productId] = res.data;
        } catch (err) {
          console.error(`Error fetching product ${productId}:`, err);
        }
      }
    }
    setProductDetails(details);
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8005/api/wishlist`, {
        params: {
          employeeId: employeeId,
          productId: productId,
        },
      });
      setWishlist(wishlist.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await axios.post("http://localhost:8005/api/cart", {
        employeeId: employeeId,
        productId: productId,
        quantity: 1,
      });

      await handleRemove(productId);
    } catch (err) {
      console.error("Error moving product to cart:", err);
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <button className="back-button" onClick={() => navigate("/afterlogin")}>
          ⬅ Back to Dashboard
        </button>
        <h1 className="wishlist-title">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p>No products in wishlist.</p>
        ) : (
          wishlist.map((item) => {
            const product = productDetails[item.productId];
            return (
              <div key={item.id} className="wishlist-card">
                {product?.image1 && (
                  <img src={product.image1} alt={product.name} />
                )}
                <div className="wishlist-card-content">
                  <h3>{product?.name || "Product Name"}</h3>
                  <p>Price: ₹{product?.price}</p>
                  <div className="wishlist-actions">
                    <button
                      className="move-btn"
                      onClick={() => handleMoveToCart(item.productId)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
