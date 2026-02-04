import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Signup successful. Please login.");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "80px auto",
      fontFamily: "Arial"
    }}>
      <h2 style={{ textAlign: "center" }}>Signup</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#1976d2", cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
}


