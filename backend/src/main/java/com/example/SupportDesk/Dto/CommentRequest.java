package com.example.SupportDesk.Dto;

import jakarta.validation.constraints.NotBlank;

public class CommentRequest {
    @NotBlank
    private String message;

    public CommentRequest(String message) {
        this.message = message;
    }

    public CommentRequest() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
