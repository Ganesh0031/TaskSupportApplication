package com.example.SupportDesk.Dto;

import com.example.SupportDesk.Entity.TicketPriority;
import com.example.SupportDesk.Entity.TicketStatus;

public class TicketUpdateRequest {
    private TicketStatus status;
    private TicketPriority priority;
    private Long assignedToUserId;

    public TicketUpdateRequest(TicketStatus status, TicketPriority priority, Long assignedToUserId) {
        this.status = status;
        this.priority = priority;
        this.assignedToUserId = assignedToUserId;
    }

    public TicketUpdateRequest() {
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public TicketPriority getPriority() {
        return priority;
    }

    public void setPriority(TicketPriority priority) {
        this.priority = priority;
    }

    public Long getAssignedToUserId() {
        return assignedToUserId;
    }

    public void setAssignedToUserId(Long assignedToUserId) {
        this.assignedToUserId = assignedToUserId;
    }
}
