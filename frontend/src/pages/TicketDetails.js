import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export function TicketDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedToUserId, setAssignedToUserId] = useState("");

  useEffect(() => {
    fetchTicket();
    fetchAllUsers();
  }, []);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/tickets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const found = res.data.data.content.find(
        (t) => t.id === Number(id)
      );

      if (!found) {
        setError("Ticket not found");
        return;
      }

      setTicket(found);
      setStatus(found.status);
      setPriority(found.priority);
      setAssignedToUserId(found.assignedToUserId || "");
    } catch {
      setError("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/tickets/allUser",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status && res.data.data) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users list");
    } finally {
      setLoadingUsers(false);
    }
  };

  const updateTicketByAdmin = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/tickets/${id}/admin`,
        {
          status,
          priority,
          assignedToUserId: assignedToUserId || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Ticket updated successfully");
      fetchTicket();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", width: "100%" }}>
          <h2>🎫 Ticket Details</h2>

          <p><b>ID:</b> {ticket.id}</p>
          <p><b>Title:</b> {ticket.title}</p>
          <p><b>Description:</b> {ticket.description}</p>
          <p><b>Status:</b> {ticket.status}</p>
          <p><b>Priority:</b> {ticket.priority}</p>
          <p><b>Created By:</b> {ticket.createdBy}</p>
          <p><b>Assigned To:</b> {ticket.assignedTo || "-"}</p>

          <hr />

          <h3>Admin Actions</h3>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              style={{ padding: "8px", width: "200px" }}
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              style={{ padding: "8px", width: "200px" }}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Assign To User
            </label>
            <select
              value={assignedToUserId}
              onChange={(e) => setAssignedToUserId(e.target.value)}
              style={{ padding: "8px", width: "200px" }}
              disabled={loadingUsers}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email} (ID: {user.id})
                </option>
              ))}
            </select>
            {loadingUsers && <span style={{ marginLeft: "10px" }}>Loading users...</span>}
          </div>

          <br />

          <button 
            onClick={updateTicketByAdmin}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Update Ticket
          </button>
        </div>
      </div>
    </div>
  );
}