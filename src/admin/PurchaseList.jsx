import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/PurchaseList.css";

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const purchaseRes = await axios.get("http://localhost:8005/api/purchases");
      const rawPurchases = purchaseRes.data;

      const enrichedPurchases = await Promise.all(
        rawPurchases.map(async (purchase) => {
          let employeeName = "N/A";
          let productImage = "";

          try {
            const empRes = await axios.get(`http://localhost:8005/api/employees/${purchase.employeeId}`);
            employeeName = empRes.data.name;
          } catch (e) {
            console.warn("Employee fetch failed for ID:", purchase.employeeId);
          }

          try {
            const prodRes = await axios.get(`http://localhost:8005/api/products/${purchase.productId}`);
            productImage = prodRes.data.image1;
          } catch (e) {
            console.warn("Product fetch failed for ID:", purchase.productId);
          }

          return {
            ...purchase,
            employeeName,
            productImage
          };
        })
      );

      setPurchases(enrichedPurchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const handleStatusChange = async (purchaseId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8005/api/purchases/${purchaseId}/status?status=${newStatus}`
      );
      fetchPurchases(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="purchase-list-container">
      <h2>All Purchases</h2>
      <table className="purchase-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Shipping Address</th>
            <th>Status</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.employeeName}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={purchase.productImage}
                    alt="Product"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <span>{purchase.productId}</span>
                </div>
              </td>
              <td>{purchase.quantity}</td>
              <td>₹{purchase.totalAmount.toFixed(2)}</td>
              <td>{purchase.shippingAddress}</td>
              <td>
                <select
                  value={purchase.status}
                  onChange={(e) =>
                    handleStatusChange(purchase.id, e.target.value)
                  }
                  className={`status-dropdown ${purchase.status.toLowerCase()}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(purchase.purchaseDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseList;
