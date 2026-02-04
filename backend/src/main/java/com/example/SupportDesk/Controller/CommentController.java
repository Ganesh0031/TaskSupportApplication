package com.example.SupportDesk.Controller;

import com.example.SupportDesk.Dto.ApiResponse;
import com.example.SupportDesk.Dto.CommentRequest;
import com.example.SupportDesk.Dto.CommentResponse;
import com.example.SupportDesk.Entity.User;
import com.example.SupportDesk.Service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }


    @PostMapping
    public ResponseEntity<ApiResponse<CommentResponse>> addComment(
            @PathVariable Long ticketId,
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        CommentResponse response =
                commentService.addComment(ticketId, request, currentUser.getUsername());

        return ResponseEntity.ok(
                new ApiResponse<>("Comment added", true, response)
        );
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<CommentResponse>>> getComments(
            @PathVariable Long ticketId
    ) {
        List<CommentResponse> comments =
                commentService.getCommentsByTicket(ticketId);

        return ResponseEntity.ok(
                new ApiResponse<>("Comments fetched", true, comments)
        );
    }
}
