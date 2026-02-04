import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const METRICS_API = "http://localhost:8080/api/dashboard/metrics";
const COMMENTS_API = "http://localhost:8080/api/tickets/8/comments"; // example ticketId

export function Dashboard() {
  const token = localStorage.getItem("token");

  const [metrics, setMetrics] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
  });

  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const [metricsRes, commentsRes] = await Promise.all([
        axios.get(METRICS_API, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(COMMENTS_API, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setMetrics(metricsRes.data);
      setRecentComments(commentsRes.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ margin: "30px", width: "100%" }}>
          <h2>📊 Dashboard</h2>

          {loading && <p>Loading dashboard...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Metrics Cards */}
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <DashboardCard title="Total Tickets" value={metrics.totalTickets} />
            <DashboardCard title="Open Tickets" value={metrics.openTickets} />
            <DashboardCard title="Resolved Tickets" value={metrics.resolvedTickets} />
          </div>

          {/* Recent Comments */}
          <div style={{ marginTop: "40px" }}>
            <h3>🗨️ Recent Comments</h3>

            {recentComments.length === 0 && !loading && (
              <p>No comments available</p>
            )}

            {recentComments.map((comment) => (
              <div key={comment.id} style={commentCardStyle}>
                <p style={{ fontWeight: "bold" }}>
                  {comment.commentedBy}
                </p>
                <p>{comment.message}</p>
                <small style={{ color: "#777" }}>
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : "Just now"}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function DashboardCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p style={numberStyle}>{value}</p>
    </div>
  );
}

/* Styles */
const cardStyle = {
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "8px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const numberStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
};

const commentCardStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
};
