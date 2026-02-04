package com.example.SupportDesk.Service.ServiceImpl;

import com.example.SupportDesk.Dto.CommentRequest;
import com.example.SupportDesk.Dto.CommentResponse;
import com.example.SupportDesk.Entity.Comment;
import com.example.SupportDesk.Entity.Role;
import com.example.SupportDesk.Entity.Ticket;
import com.example.SupportDesk.Entity.User;
import com.example.SupportDesk.Repository.CommentRepository;
import com.example.SupportDesk.Repository.TicketRepository;
import com.example.SupportDesk.Repository.UserRepository;
import com.example.SupportDesk.Service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class CommentServiceImpl implements CommentService {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    public CommentServiceImpl(UserRepository userRepository, TicketRepository ticketRepository, CommentRepository commentRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CommentResponse addComment(
            Long ticketId,
            CommentRequest request,
            String email
    ) {

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));


        if (currentUser.getRole() == Role.ROLE_USER &&
                !ticket.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied: You cannot comment on this ticket");
        }


        Comment comment = new Comment();
        comment.setTicket(ticket);
        comment.setUser(currentUser);
        comment.setMessage(request.getMessage());
        comment.setCreateAt(LocalDateTime.now());

        Comment saved = commentRepository.save(comment);
        return mapToResponse(saved);
    }


    @Override
    public List<CommentResponse> getCommentsByTicket(Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        return commentRepository.findByTicket(ticket)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    private CommentResponse mapToResponse(Comment comment) {

        CommentResponse response =
                modelMapper.map(comment, CommentResponse.class);

        response.setCommentedBy(
                comment.getUser().getEmail()
        );

        return response;
    }
}
