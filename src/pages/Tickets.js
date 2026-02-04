import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddCommentModal from "../user/AddCommentModal";


const API_URL = "http://localhost:8080/api/tickets";

export default function Tickets() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commentTicketId, setCommentTicketId] = useState(null);


  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [page, status, priority]);

  const fetchTickets = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size: 10,
          status: status || undefined,
          priority: priority || undefined,
        },
      });

      const data = res.data.data;
      setTickets(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (e, ticketId) => {
    e.stopPropagation(); // Prevent row click from triggering
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", width: "100%" }}>
          <h2>🎫 Tickets</h2>

          {/* Filters */}
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <select value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }}>
              <option value="">All Status</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </select>

            <select value={priority} onChange={(e) => { setPage(0); setPriority(e.target.value); }}>
              <option value="">All Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          {loading && <p>Loading tickets...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && tickets.length > 0 && (
            <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
              <thead style={{ background: "#f0f0f0" }}>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created By</th>
                  <th>Assigned To</th>
                  <th>Created At</th>
                  <th>Actions</th> {/* New column for actions */}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                  >
                    <td>{ticket.id}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.createdBy}</td>
                    <td>{ticket.assignedTo || "-"}</td>
                    <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                    <td onClick={(e) => e.stopPropagation()}>
  <button
    onClick={(e) => handleUpdateClick(e, ticket.id)}
    style={{
      padding: "5px 10px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "6px",
    }}
  >
    Update
  </button>

  {/* ✅ Comment Button */}
  <button
    onClick={() => setCommentTicketId(ticket.id)}
    style={{
      padding: "5px 10px",
      background: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Comment
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && tickets.length === 0 && <p>No tickets found</p>}

          {/* Pagination */}
          <div style={{ marginTop: "20px" }}>
            <button disabled={page === 0} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span style={{ margin: "0 15px" }}>
              Page {page + 1} of {totalPages}
            </span>
            <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
      {commentTicketId && (
  <AddCommentModal
    ticketId={commentTicketId}
    onClose={() => setCommentTicketId(null)}
  />
)}

    </div>
  );
}