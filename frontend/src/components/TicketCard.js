import React from "react";

function TicketCard({ ticket }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}>
      <h4>{ticket.title}</h4>
      <p>{ticket.description}</p>
      <p>Status: <b>{ticket.status}</b> | Priority: <b>{ticket.priority}</b></p>
    </div>
  );
}

export { TicketCard};
