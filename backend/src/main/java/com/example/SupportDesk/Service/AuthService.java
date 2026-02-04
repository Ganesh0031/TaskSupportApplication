package com.example.SupportDesk.Service;


import com.example.SupportDesk.Dto.JwtResponse;
import com.example.SupportDesk.Dto.LoginRequest;
import com.example.SupportDesk.Dto.SignupRequest;

public interface AuthService {
    void register(SignupRequest request);
    JwtResponse login(LoginRequest request);
}
