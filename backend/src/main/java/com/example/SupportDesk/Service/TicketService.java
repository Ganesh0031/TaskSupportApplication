package com.example.SupportDesk.Service;

import com.example.SupportDesk.Dto.TicketRequest;
import com.example.SupportDesk.Dto.TicketResponse;
import com.example.SupportDesk.Dto.TicketUpdateRequest;
import com.example.SupportDesk.Dto.UserAssignView;
import com.example.SupportDesk.Entity.TicketPriority;
import com.example.SupportDesk.Entity.TicketStatus;
import com.example.SupportDesk.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TicketService {
  List<UserAssignView> getAllUser();

    TicketResponse createTicket(TicketRequest request, String email);

    Page<TicketResponse> getMyTickets(String email, Pageable pageable);


    Page<TicketResponse> getAllTickets(
            TicketStatus status,
            TicketPriority priority,
            Pageable pageable
    );

    TicketResponse updateTicketByUser(
            Long ticketId,
            TicketRequest request,
            String email
    );

    TicketResponse updateTicketByAdmin(
            Long ticketId,
            TicketUpdateRequest request
    );
}
