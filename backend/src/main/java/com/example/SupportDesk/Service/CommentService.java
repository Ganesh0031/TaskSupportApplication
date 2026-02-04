package com.example.SupportDesk.Service;

import com.example.SupportDesk.Dto.CommentRequest;
import com.example.SupportDesk.Dto.CommentResponse;
import com.example.SupportDesk.Entity.User;

import java.util.List;

public interface CommentService {
    CommentResponse addComment(
            Long ticketId,
            CommentRequest request,
            String email
    );

    List<CommentResponse> getCommentsByTicket(Long ticketId);
}
