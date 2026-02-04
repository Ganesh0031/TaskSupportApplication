package com.example.SupportDesk.Dto;

import java.time.LocalDateTime;

public class CommentResponse {
    private Long id;
    private String message;
    private String commentedBy;
    private LocalDateTime createdAt;

    public CommentResponse(Long id, String message, String commentedBy, LocalDateTime createdAt) {
        this.id = id;
        this.message = message;
        this.commentedBy = commentedBy;
        this.createdAt = createdAt;
    }

    public CommentResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCommentedBy() {
        return commentedBy;
    }

    public void setCommentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
