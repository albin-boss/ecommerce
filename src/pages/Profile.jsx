import React from "react";
import "./profile.css";

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Apartment 4B, Cityville, NY",
    orders: [
      { id: 1, product: "Laptop", status: "Shipped", date: "2025-04-01" },
      { id: 2, product: "Headphones", status: "Delivered", date: "2025-03-20" },
      { id: 3, product: "Smartphone", status: "Pending", date: "2025-02-15" }
    ]
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Your Profile</h2>
      <div className="profile-details">
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
        </div>
      </div>

      <h3 className="orders-header">Your Orders</h3>
      <div className="order-list">
        {user.orders.map((order) => (
          <div key={order.id} className="order-item">
            <p>Order ID: {order.id}</p>
            <p>Product: {order.product}</p>
            <p>Status: {order.status}</p>
            <p>Date: {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
