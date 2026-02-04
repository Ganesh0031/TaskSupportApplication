package com.example.SupportDesk.Controller;

import com.example.SupportDesk.Dto.*;
import com.example.SupportDesk.Entity.TicketPriority;
import com.example.SupportDesk.Entity.TicketStatus;
import com.example.SupportDesk.Entity.User;
import com.example.SupportDesk.Service.TicketService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

@PostMapping
@PreAuthorize("hasRole('USER')")
public ResponseEntity<ApiResponse<TicketResponse>> createTicket(
        @Valid @RequestBody TicketRequest request,
        @AuthenticationPrincipal UserDetails userDetails
) {
    System.out.println("UserDetails: " + userDetails.getUsername());

    TicketResponse response =
            ticketService.createTicket(request, userDetails.getUsername());

    return ResponseEntity.ok(
            new ApiResponse<>("Ticket created", true, response)
    );
}

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Page<TicketResponse>>> getMyTickets(
            Pageable pageable,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Page<TicketResponse> tickets =
                ticketService.getMyTickets(userDetails.getUsername(), pageable);

        return ResponseEntity.ok(
                new ApiResponse<>("My tickets fetched", true, tickets)
        );
    }



    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Page<TicketResponse>>> getAllTickets(
            @RequestParam(required = false) TicketStatus status,
            @RequestParam(required = false) TicketPriority priority,
            Pageable pageable
    ) {
        Page<TicketResponse> tickets =
                ticketService.getAllTickets(status, priority, pageable);

        return ResponseEntity.ok(
                new ApiResponse<>("All tickets fetched", true, tickets)
        );
    }
    @GetMapping("/allUser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserAssignView>>> getAllUser() {
        List<UserAssignView> user = ticketService.getAllUser();

        return ResponseEntity.ok(
                new ApiResponse<>("All user fetched", true, user)
        );
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<TicketResponse>> updateTicketByUser(
            @PathVariable Long id,
            @Valid @RequestBody TicketRequest request,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        TicketResponse response =
                ticketService.updateTicketByUser(id, request, currentUser.getUsername());

        return ResponseEntity.ok(
                new ApiResponse<>("Ticket updated", true, response)
        );
    }


    @PutMapping("/{id}/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<TicketResponse>> updateTicketByAdmin(
            @PathVariable Long id,
            @RequestBody TicketUpdateRequest request
    ) {
        TicketResponse response =
                ticketService.updateTicketByAdmin(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>("Ticket updated by admin", true, response)
        );
    }
}
