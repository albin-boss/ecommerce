import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/CustomCart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (employeeId) {
      axios
        .get(`http://localhost:8005/api/cart/${employeeId}`)
        .then(async (res) => {
          const cartData = res.data;
          setCartItems(cartData);

          const productRequests = cartData.map(item =>
            axios.get(`http://localhost:8005/api/products/${item.productId}`)
          );

          const productResponses = await Promise.all(productRequests);
          const productMap = {};
          productResponses.forEach(response => {
            const product = response.data;
            productMap[product.id] = product;
          });

          setProducts(productMap);
        })
        .catch((err) => console.error("Error fetching cart items:", err));
    }
  }, [employeeId]);

  const handleRemove = (cartId) => {
    axios
      .delete(`http://localhost:8005/api/cart/${cartId}/employee/${employeeId}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== cartId));
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleQuantityChange = (productId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );

    axios
      .put(`http://localhost:8005/api/cart/${employeeId}/${productId}`, {
        quantityChange: change
      })
      .catch(err => console.error("Error updating quantity:", err));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const product = products[item.productId];
    return product ? total + product.price * item.quantity : total;
  }, 0);

  return (
    <div className="custom-dark-cart-page">
      <div className="custom-dark-cart-main">
        <h1 className="custom-dark-cart-title">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="custom-dark-empty-msg">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(({ id, productId, quantity }) => {
              const product = products[productId];
              if (!product) return null;

              return (
                <div key={id} className="custom-dark-cart-card">
                  <img src={product.image1} alt={product.name} className="custom-dark-cart-image" />
                  <div className="custom-dark-cart-details">
                    <h2 className="custom-dark-cart-name">{product.name}</h2>
                    <p className="custom-dark-cart-meta">Price: ₹{product.price}</p>
                    <p className="custom-dark-cart-meta">Category: {product.category}</p>
                    <div className="custom-dark-quantity-control">
                      <button onClick={() => handleQuantityChange(productId, -1)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => handleQuantityChange(productId, 1)}>+</button>
                    </div>
                    <button
                      className="custom-dark-cart-remove"
                      onClick={() => handleRemove(id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="custom-dark-total-section">
              <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
              <button className="custom-dark-checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
