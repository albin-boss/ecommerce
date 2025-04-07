import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './css/Dashboard.css'; // 👈 Custom CSS file

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const barChartOptions = {
    series: [
      {
        data: [10, 8, 6, 4, 2],
        name: 'Products',
      },
    ],
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
    },
    colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      },
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
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark',
    },
    xaxis: {
      categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
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
    chart: {
      type: 'area',
      background: 'transparent',
      stacked: false,
      toolbar: { show: false },
    },
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
    markers: {
      size: 6,
      strokeColors: '#1b2635',
      strokeWidth: 3,
    },
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
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark',
    },
  };

  return (
    <div className="dashboard-container">
      <button onClick={() => setSidebarOpen(true)}>Open Sidebar</button>
      <button onClick={() => setSidebarOpen(false)}>Close Sidebar</button>

      <div id="sidebar" className={sidebarOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        {/* Sidebar content */}
      </div>

      <div className="chart-section">
        <div className="chart-box">
          <ReactApexChart
            options={barChartOptions}
            series={barChartOptions.series}
            type="bar"
            height={350}
          />
        </div>
        <div className="chart-box">
          <ReactApexChart
            options={areaChartOptions}
            series={areaChartOptions.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
