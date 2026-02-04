import React from "react";
import { useNavigate } from "react-router-dom";

function ChoseRole() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Select Login Type</h2>

      <button
        onClick={() => handleSelect("ROLE_ADMIN")}
        style={{ padding: "12px 30px", margin: "10px", fontSize: "16px" }}
      >
        Admin Login
      </button>

      <button
        onClick={() => handleSelect("ROLE_USER")}
        style={{ padding: "12px 30px", margin: "10px", fontSize: "16px" }}
      >
        User Login
      </button>
    </div>
  );
}

export default ChoseRole;
