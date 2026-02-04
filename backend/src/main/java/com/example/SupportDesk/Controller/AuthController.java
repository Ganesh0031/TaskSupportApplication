package com.example.SupportDesk.Controller;

import com.example.SupportDesk.Dto.ApiResponse;
import com.example.SupportDesk.Dto.JwtResponse;
import com.example.SupportDesk.Dto.LoginRequest;
import com.example.SupportDesk.Dto.SignupRequest;
import com.example.SupportDesk.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(
            @Valid @RequestBody SignupRequest request
    ) {
        authService.register(request);

        return ResponseEntity.ok(
                new ApiResponse<>("User registered successfully", true, null)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {
        JwtResponse token = authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>("Login successful", true, token)
        );
    }
}
