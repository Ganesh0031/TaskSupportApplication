

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateTicketModel from "../user/UpdateTicketModel";
import AddCommentModal from "../user/AddCommentModal";



function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [commentTicketId, setCommentTicketId] = useState(null);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tickets/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(response.data?.data?.content || []);
    } catch {
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Open Update Popup
  const handleUpdate = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleAddTicket = () => {
    navigate("/addticket");
  };

   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>My Tickets</h2>

        {/* ✅ Add Ticket Button */}
        <button
          onClick={handleAddTicket}
          style={{
            padding: "10px 16px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Add Ticket
        </button>

          <button style={{ float: "right" }} onClick={handleLogout}>Logout</button>
      </div>

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && tickets.length === 0 && <p>No tickets found</p>}

      {/* Ticket Cards */}
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "16px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 8px 0" }}>{ticket.title}</h4>
            <p style={{ margin: "0 0 6px 0", color: "#555" }}>
              {ticket.description}
            </p>
            <small>
              Status: <b>{ticket.status}</b> | Created At:{" "}
              {new Date(ticket.createdAt).toLocaleString()}
            </small>
          </div>

          {/* ✅ Update Button */}
         <div style={{ display: "flex", gap: "10px" }}>
  <button
    onClick={() => handleUpdate(ticket)}
    style={{
      padding: "8px 14px",
      backgroundColor: "#ff9800",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Update
  </button>

  {/* ✅ Comment Button */}
  <button
    onClick={() => setCommentTicketId(ticket.id)}
    style={{
      padding: "8px 14px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Comment
  </button>
</div>

        </div>
      ))}

      {/* ✅ Update Popup */}
      {selectedTicket && (
        <UpdateTicketModel
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onSuccess={fetchTickets}
        />
      )}

      {commentTicketId && (
  <AddCommentModal
    ticketId={commentTicketId}
    onClose={() => setCommentTicketId(null)}
  />
)}

    </div>
  );
}

export default UserDashboard;

