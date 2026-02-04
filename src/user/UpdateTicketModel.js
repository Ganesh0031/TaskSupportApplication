import React, { useState } from "react";
import axios from "axios";

function UpdateTicketModel({ ticket, onClose, onSuccess }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [ticketPriority, setTicketPriority] = useState(
    ticket.priority || "MEDIUM"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:8080/api/tickets/${ticket.id}`,
        {
          title,
          description,
          ticketPriority, // 🔑 matches backend body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSuccess(); // refresh ticket list
      onClose();   // close popup
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Update Ticket</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleUpdate}>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={inputStyle}
          />

          <label>Priority</label>
          <select
            value={ticketPriority}
            onChange={(e) => setTicketPriority(e.target.value)}
            style={inputStyle}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button type="submit" disabled={loading} style={primaryBtn}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" onClick={onClose} style={secondaryBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🔹 Simple styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  width: "400px",
  borderRadius: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
};

const primaryBtn = {
  flex: 1,
  padding: "10px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
};

const secondaryBtn = {
  flex: 1,
  padding: "10px",
  background: "#9e9e9e",
  color: "#fff",
  border: "none",
};

export default UpdateTicketModel;
