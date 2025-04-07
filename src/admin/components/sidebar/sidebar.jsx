// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Optional, for custom styles

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">PREMIUM</h2>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/customers">Users</Link></li>
        <li><Link to="/allproduct">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/offers">Offers</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
