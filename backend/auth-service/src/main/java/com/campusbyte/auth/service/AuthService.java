package com.campusbyte.auth.service;

import com.campusbyte.auth.dto.*;
import com.campusbyte.auth.model.RefreshToken;
import com.campusbyte.auth.model.User;
import com.campusbyte.auth.model.UserStatus;
import com.campusbyte.auth.repository.RefreshTokenRepository;
import com.campusbyte.auth.repository.UserRepository;
import com.campusbyte.auth.security.JwtService;
import com.campusbyte.common.exception.BadRequestException;
import com.campusbyte.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Validate passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        // Create user
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole())
                .status(UserStatus.ACTIVE)
                .passwordChangedAt(LocalDateTime.now())
                .build();

        user = userRepository.save(user);
        log.info("User registered successfully: {}", user.getEmail());

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        // Check if account is locked
        if (user.isAccountLocked()) {
            throw new BadRequestException("Account is locked. Please try again later.");
        }

        // Check if account is active
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadRequestException("Account is not active. Please contact administrator.");
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            user.incrementFailedAttempts();
            userRepository.save(user);
            
            if (user.isAccountLocked()) {
                throw new BadRequestException("Account locked due to too many failed attempts. Please try again in 30 minutes.");
            }
            throw new BadCredentialsException("Invalid email or password");
        }

        // Reset failed attempts and update last login
        user.resetFailedAttempts();
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        log.info("User logged in successfully: {}", user.getEmail());
        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));

        if (!refreshToken.isValid()) {
            throw new BadRequestException("Refresh token is expired or revoked");
        }

        // Revoke old token
        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);

        // Generate new tokens
        User user = refreshToken.getUser();
        log.info("Token refreshed for user: {}", user.getEmail());
        
        return generateAuthResponse(user);
    }

    @Transactional
    public void logout(String refreshTokenStr) {
        refreshTokenRepository.findByToken(refreshTokenStr).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
            log.info("User logged out: {}", token.getUser().getEmail());
        });
    }

    @Transactional
    public void logoutAll(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        refreshTokenRepository.revokeAllByUser(user);
        log.info("All sessions revoked for user: {}", user.getEmail());
    }

    public void requestPasswordReset(PasswordResetRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            // In a real application, send email with reset link
            log.info("Password reset requested for: {}", user.getEmail());
        });
        // Always return success to prevent email enumeration
    }

    private AuthResponse generateAuthResponse(User user) {
        String accessToken = jwtService.generateAccessToken(
                user.getEmail(),
                user.getId(),
                user.getRole().name()
        );
        
        String refreshTokenStr = jwtService.generateRefreshToken(user.getEmail());

        // Save refresh token
        RefreshToken refreshToken = RefreshToken.builder()
                .token(refreshTokenStr)
                .user(user)
                .expiresAt(LocalDateTime.now().plusSeconds(jwtService.getRefreshTokenExpiration() / 1000))
                .build();
        refreshTokenRepository.save(refreshToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenStr)
                .user(UserDto.fromEntity(user))
                .expiresIn(jwtService.getAccessTokenExpiration())
                .build();
    }
}
