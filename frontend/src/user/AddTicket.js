import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and Description are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/tickets",
        {
          title,
          description,
          priority, // LOW | MEDIUM | HIGH
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Redirect after success
      navigate("/userdashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "60px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Ticket
      </h2>

      {error && (
        <div style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue"
            rows="4"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Priority */}
        <div style={{ marginBottom: "20px" }}>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/userdashboard")}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#9e9e9e",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTicket;
