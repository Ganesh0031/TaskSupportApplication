import React, { useState } from "react";
import axios from "axios";

function AddCommentModal({ ticketId, onClose }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:8080/api/tickets/${ticketId}/comments`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onClose();
    } catch (err) {
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Add Comment</h3>

        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your comment..."
          style={{ width: "100%", padding: "8px" }}
        />

        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <button onClick={onClose} style={btnCancel}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={btnSubmit}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCommentModal;

/* ---- styles ---- */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "6px",
  width: "400px",
};

const btnCancel = {
  padding: "8px 12px",
  marginRight: "10px",
};

const btnSubmit = {
  padding: "8px 14px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
