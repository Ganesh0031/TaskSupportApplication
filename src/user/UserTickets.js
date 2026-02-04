import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (ticketId) => {
    navigate(`/tickets/update/${ticketId}`);
  };

  const handleAddTicket = () => {
    navigate("/tickets/add");
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

        {/* ✅ Add Button on Right Corner */}
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
      </div>

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && tickets.length === 0 && (
        <p>No tickets found</p>
      )}

      {/* Ticket List */}
      <div>
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

            {/* ✅ Update Button on Every Ticket */}
            <button
              onClick={() => handleUpdate(ticket.id)}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserTickets;
