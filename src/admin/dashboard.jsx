import { useState } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import "./css/Dashboard.css";

const salesData = [
  { name: "Jan", sales: 30 },
  { name: "Feb", sales: 45 },
  { name: "Mar", sales: 60 },
  { name: "Apr", sales: 80 },
  { name: "May", sales: 75 },
  { name: "Jun", sales: 95 },
];

const topProducts = [
  { name: "phones-", sales: 500 },
  { name: "dress-", sales: 450 },
  { name: "watches-", sales: 400 },
  { name: "makeup-", sales: 350 },
  { name: "dry fruits-", sales: 300 },
];

const premiumCustomers = [
  { name: "John Doe", spending: "$1200" },
  { name: "Jane Smith", spending: "$1100" },
  { name: "Alice Johnson", spending: "$1050" },
  { name: "Robert Brown", spending: "$980" },
  { name: "Emily Davis", spending: "$950" },
];

export default function Dashboard() {
  const [totalSales] = useState(40000);
  const [totalRevenue] = useState(90900);
  const [totalVisits] = useState(35000);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`dashboard-container ${darkMode ? 'dashboard-dark' : 'dashboard-light'}`}>
      {/* Top Navigation Bar */}
      <div className="dashboard-navbar">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="dashboard-menu-button">
          <FaBars size={24} className="dashboard-menu-icon" />
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="dashboard-theme-toggle">
          {darkMode ? <FaSun size={20} className="dashboard-light-icon" /> : <FaMoon size={20} className="dashboard-dark-icon" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="dashboard-layout">
        {/* Sidebar Navigation */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <ul className="dashboard-nav-list">
            <li>Dashboard</li>
            <li>Email</li>
            <li>users</li>
            <li>add product</li>
            <li>products</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </aside>
        
        {/* Main Dashboard Content */}
        <div className="dashboard-content">
          {/* Overview Cards */}
          <div className="dashboard-cards">
            {["Total Sales", "Total Revenue", "Total Visits"].map((title, i) => (
              <div key={i} className="dashboard-card">
                <h2>{title}</h2>
                <p>{[totalSales, totalRevenue, totalVisits][i]}</p>
              </div>
            ))}
          </div>
          
          {/* Sales Chart */}
          <div className="dashboard-chart">
            <h2>Sales Overview</h2>
            <div className="dashboard-chart-placeholder">Graph will be here</div>
          </div>
          
          {/* Product and Customer Lists */}
          <div className="dashboard-lists">
            {["Top Selling Products", "Premium Customers"].map((title, i) => (
              <div key={i} className="dashboard-list-card">
                <h2>{title}</h2>
                <ul>
                  {(i === 0 ? topProducts : premiumCustomers).map((item, index) => (
                    <li key={index} className="dashboard-list-item">
                      <span>{item.name}</span>
                      <span>{i === 0 ? `${item.sales} sales` : item.spending}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
     
    </div>
  );
}
