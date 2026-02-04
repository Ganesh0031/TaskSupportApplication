import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#f0f0f0", height: "100vh", padding: "20px" }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tickets">Tickets</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
