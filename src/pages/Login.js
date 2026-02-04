import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const selectedRole = localStorage.getItem("selectedRole");

  // 🚫 Block direct login without role selection
  useEffect(() => {
    if (!selectedRole) {
      navigate("/");
    }
  }, [navigate, selectedRole]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data?.data?.token;
      const role = response.data?.data?.role;

      if (!token || !role) {
        setError("Invalid login response");
        return;
      }

      // ❌ Role mismatch protection
      if (role !== selectedRole) {
        setError("You are not authorized for this role");
        return;
      }

      // ✅ Save auth info
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // ✅ Redirect based on role
      if (role === "ROLE_ADMIN") {
        navigate("/dashboard");
      } else if (role === "ROLE_USER") {
        navigate("/userdashboard");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Invalid email or password");
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        fontFamily: "Arial",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "6px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {selectedRole === "ROLE_ADMIN" ? "Admin Login" : "User Login"}
      </h2>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* ✅ Signup only for USER */}
      {selectedRole === "ROLE_USER" && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <span>Don’t have an account? </span>
          <Link
            to="/signup1"
            style={{ color: "#1976d2", fontWeight: "bold" }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export { Login };
