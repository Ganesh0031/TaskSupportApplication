package com.example.SupportDesk.Service.ServiceImpl;

import com.example.SupportDesk.Dto.TicketRequest;
import com.example.SupportDesk.Dto.TicketResponse;
import com.example.SupportDesk.Dto.TicketUpdateRequest;
import com.example.SupportDesk.Dto.UserAssignView;
import com.example.SupportDesk.Entity.Ticket;
import com.example.SupportDesk.Entity.TicketPriority;
import com.example.SupportDesk.Entity.TicketStatus;
import com.example.SupportDesk.Entity.User;
import com.example.SupportDesk.Repository.TicketRepository;
import com.example.SupportDesk.Repository.UserRepository;
import com.example.SupportDesk.Service.TicketService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public TicketServiceImpl(
            TicketRepository ticketRepository,
            UserRepository userRepository,
            ModelMapper modelMapper
    ) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserAssignView> getAllUser() {
        return userRepository.getAllUsers();
    }

    @Override
    public TicketResponse createTicket(TicketRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setTicketPriority(request.getTicketPriority());
        ticket.setDescription(request.getDescription());
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setCreatedBy(user);
        ticket.setCreateAt(LocalDateTime.now());
        ticket.setUpdateAt(LocalDateTime.now());

        ticketRepository.save(ticket);

        return mapToResponse(ticket);
    }

    @Override
    public Page<TicketResponse> getMyTickets(String email, Pageable pageable) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ticketRepository
                .findByCreatedBy(user, pageable)
                .map(this::mapToResponse);
    }


    @Override
    public Page<TicketResponse> getAllTickets(
            TicketStatus status,
            TicketPriority priority,
            Pageable pageable
    ) {
        Page<Ticket> tickets;

        if (status != null && priority != null) {
            tickets = ticketRepository
                    .findByStatusAndTicketPriority(status, priority, pageable);
        } else if (status != null) {
            tickets = ticketRepository
                    .findByStatus(status, pageable);
        } else {
            tickets = ticketRepository.findAll(pageable);
        }

        return tickets.map(this::mapToResponse);
    }
    @Override
    public TicketResponse updateTicketByUser(
            Long ticketId,
            TicketRequest request,
            String email
    ) {
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        // ownership check
        if (!ticket.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        // status check
        if (ticket.getStatus() != TicketStatus.OPEN) {
            throw new RuntimeException("Only OPEN tickets can be updated");
        }
        System.out.println("Priority = " + request.getTicketPriority());

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setTicketPriority(request.getTicketPriority());
        ticket.setUpdateAt(LocalDateTime.now());

        return mapToResponse(ticketRepository.save(ticket));
    }

    @Override
    public TicketResponse updateTicketByAdmin(
            Long ticketId,
            TicketUpdateRequest request
    ) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (request.getStatus() != null) {
            ticket.setStatus(request.getStatus());
        }

        if (request.getPriority() != null) {
            ticket.setTicketPriority(request.getPriority());
        }

        if (request.getAssignedToUserId() != null) {
            User assignee = userRepository.findById(request.getAssignedToUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            ticket.setAssignedTo(assignee);
        }

        ticket.setUpdateAt(LocalDateTime.now());
        return mapToResponse(ticketRepository.save(ticket));
    }

    private TicketResponse mapToResponse(Ticket ticket) {

        TicketResponse response = new TicketResponse();

        response.setId(ticket.getId());
        response.setTitle(ticket.getTitle());
        response.setDescription(ticket.getDescription());
        response.setStatus(ticket.getStatus());
        response.setPriority(ticket.getTicketPriority());

        response.setCreatedBy(
                ticket.getCreatedBy() != null
                        ? ticket.getCreatedBy().getEmail()
                        : null
        );

        response.setAssignedTo(
                ticket.getAssignedTo() != null
                        ? ticket.getAssignedTo().getEmail()
                        : null
        );

        response.setCreatedAt(ticket.getCreateAt());

        return response;
    }


}
