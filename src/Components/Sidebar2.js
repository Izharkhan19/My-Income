import React, { useEffect, useState } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
// import Defaultlayout from "./Defaultlayout";

const Sidebar2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 2000) {
      setSidebarOpen(true);
    }
  });
  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="toggle-btn" onClick={toggleNav}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <Link to="/">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        .
        <Link to="/DashBoard">
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </Link>
        .
        <Link to="/">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </Link>
        .
        <Link to="/Chat">
          <i className="fas fa-envelope"></i>
          <span>Messages</span>
        </Link>
        .
        <Link to="/">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </Link>
        .
      </div>

      <div id="main">
        {/* <Defaultlayout /> */}
        <div>Hello</div>
      </div>
    </div>
  );
};

export default Sidebar2;
