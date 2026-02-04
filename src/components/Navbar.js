import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", background: "#1976d2", color: "white" }}>
      <span style={{ fontWeight: "bold", fontSize: "20px" }}>Support Dashboard</span>
      <button style={{ float: "right" }} onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
