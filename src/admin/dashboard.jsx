import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './css/Dashboard.css';
import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';


function Dashboard() {
  const [barChartData, setBarChartData] = useState({ categories: [], counts: [] });
  const [latestPurchases, setLatestPurchases] = useState([]);

  useEffect(() => {
    fetchBarChartData();
    fetchLatestPurchases();
  }, []);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get('/api/products/category-count');
      const categories = response.data.map(item => item.categoryName);
      const counts = response.data.map(item => item.count);
      setBarChartData({ categories, counts });
    } catch (error) {
      console.error('Error fetching category chart data', error);
    }
  };

  const fetchLatestPurchases = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/purchases');
      const formattedPurchases = response.data.map(purchase => ({
        employeeName: purchase.employeeName,
        productName: purchase.productName,
        quantity: purchase.quantity,
        totalAmount: purchase.totalAmount,
        status: purchase.status,
        purchaseDate: new Date(purchase.purchaseDate).toLocaleDateString()
      }));
      setLatestPurchases(formattedPurchases);
    } catch (error) {
      console.error('Error fetching latest purchases:', error);
    }
  };

  const barChartOptions = {
    series: [{ data: barChartData.counts, name: 'Products' }],
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
    plotOptions: {
      bar: { distributed: true, borderRadius: 4, horizontal: false, columnWidth: '40%' },
    },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: {
      borderColor: '#55596e',
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: true } },
    },
    legend: {
      labels: { colors: '#f5f7ff' },
      show: true,
      position: 'top',
    },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    tooltip: { shared: true, intersect: false, theme: 'dark' },
    xaxis: {
      categories: barChartData.categories,
      title: { style: { color: '#f5f7ff' } },
      axisBorder: { show: true, color: '#55596e' },
      axisTicks: { show: true, color: '#55596e' },
      labels: { style: { colors: '#f5f7ff' } },
    },
    yaxis: {
      title: { text: 'Count', style: { color: '#f5f7ff' } },
      axisBorder: { show: true, color: '#55596e' },
      axisTicks: { show: true, color: '#55596e' },
      labels: { style: { colors: '#f5f7ff' } },
    },
  };

  const areaChartOptions = {
    series: [
      { name: 'Purchase Orders', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Sales Orders', data: [11, 32, 45, 32, 34, 52, 41] },
    ],
    chart: { type: 'area', background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: ['#00ab57', '#d50000'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        shadeIntensity: 1,
        stops: [0, 100],
        type: 'vertical',
      },
    },
    grid: {
      borderColor: '#55596e',
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: true } },
    },
    legend: {
      labels: { colors: '#f5f7ff' },
      show: true,
      position: 'top',
    },
    markers: { size: 6, strokeColors: '#1b2635', strokeWidth: 3 },
    stroke: { curve: 'smooth' },
    xaxis: {
      axisBorder: { show: true, color: '#55596e' },
      axisTicks: { show: true, color: '#55596e' },
      labels: { offsetY: 5, style: { colors: '#f5f7ff' } },
    },
    yaxis: [
      {
        title: { text: 'Purchase Orders', style: { color: '#f5f7ff' } },
        labels: { style: { colors: ['#f5f7ff'] } },
      },
      {
        opposite: true,
        title: { text: 'Sales Orders', style: { color: '#f5f7ff' } },
        labels: { style: { colors: ['#f5f7ff'] } },
      },
    ],
    tooltip: { shared: true, intersect: false, theme: 'dark' },
  };
 
  return (
    <div className="dashboard-layout">
       <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">Welcome, Rebel!</div>
        </header>

        <div className="chart-section vertical">
          <div className="chart-box">
            <h3 className="chart-title">Top Product Categories</h3>
            <ReactApexChart
              options={barChartOptions}
              series={barChartOptions.series}
              type="bar"
              height={350}
            />
          </div>
          <div className="chart-box">
            <h3 className="chart-title">Monthly Orders Overview</h3>
            <ReactApexChart
              options={areaChartOptions}
              series={areaChartOptions.series}
              type="area"
              height={350}
            />
          </div>
        </div>

        <div className="purchase-history">
          <h3 className="section-title">Latest Purchase History</h3>
          <table className="purchase-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {latestPurchases.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.employeeName}</td>
                  <td>{purchase.productName}</td>
                  <td>{purchase.quantity}</td>
                  <td>${purchase.totalAmount}</td>
                  <td className={`status ${purchase.status.toLowerCase()}`}>{purchase.status}</td>
                  <td>{purchase.purchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
