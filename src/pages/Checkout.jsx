import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/CustomCart.css";

export default function Billing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, products, totalAmount } = location.state || {};

  const employeeId = localStorage.getItem("employeeId");
  const deliveryCharge = 50;
  const grandTotal = totalAmount + deliveryCharge;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_3VgjumYvXnvd0w", // Replace with your Razorpay key
      amount: grandTotal * 100,
      currency: "INR",
      name: "HRMS Store",
      description: "Order Payment",
      handler: async function (response) {
        try {
          // 1. Send each cart item to the purchases endpoint
          const shippingAddress = "Employee Office Address"; // Modify if needed
          const status = "Pending";
          const purchaseDate = new Date();

          for (let item of cartItems) {
            const product = products[item.productId];
            await axios.post("http://localhost:8005/api/purchases", {
              employeeId,
              productId: item.productId,
              quantity: item.quantity,
              totalAmount: product.price * item.quantity,
              shippingAddress,
              status,
              purchaseDate
            });

            // Optional: Delete from cart
            await axios.delete(`http://localhost:8005/api/cart/${item.id}/employee/${employeeId}`);
          }

          alert("Payment Successful! Order placed.");
          navigate("/myorder");
        } catch (err) {
          console.error("Error saving purchase:", err);
          alert("Purchase failed! Please try again.");
        }
      },
      prefill: {
        name: "Employee",
        email: "employee@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#121212"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="custom-dark-cart-page">
      <div className="custom-dark-cart-main">
        <h1 className="custom-dark-cart-title">Billing Details</h1>

        {cartItems?.map(({ id, productId, quantity }) => {
          const product = products[productId];
          return (
            <div key={id} className="custom-dark-cart-card">
              <h3>{product?.name} x {quantity}</h3>
              <p>₹{product?.price * quantity}</p>
            </div>
          );
        })}

        <div className="custom-dark-total-section">
          <p>Items Total: ₹{totalAmount.toFixed(2)}</p>
          <p>Delivery Charge: ₹{deliveryCharge}</p>
          <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>
          <p>Expected Delivery: {deliveryDate.toDateString()}</p>
          <button className="custom-dark-checkout-btn" onClick={handlePayment}>
            Proceed to Pay
          </button>
          <button className="custom-dark-cart-remove" onClick={() => navigate(-1)}>
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
