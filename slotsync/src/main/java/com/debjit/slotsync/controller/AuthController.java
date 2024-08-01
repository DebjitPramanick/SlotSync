package com.debjit.slotsync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.debjit.slotsync.dto.ResponseWithMessageDTO;
import com.debjit.slotsync.dto.UserDTO;
import com.debjit.slotsync.service.UserService;
import com.debjit.slotsync.service.AuthService.CustomUserDetailsService;
import com.debjit.slotsync.service.AuthService.JwtUtils;

public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO authRequestDTO) {
        try {

            UserDTO userDTO = userService.getUserByEmail(authRequestDTO.getEmail());
            if (userDTO != null) {
                throw new Exception("User already exists with this email.");
            }
            userDTO = new UserDTO();
            userDTO.setName(authRequestDTO.getName());
            userDTO.setEmail(authRequestDTO.getEmail());
            userDTO.setPassword(passwordEncoder.encode(authRequestDTO.getPassword()));

            String token = jwtUtils.generateToken(userDTO.getEmail());

            userDTO = userService.createUser(userDTO);
            ResponseCookie cookie = generateCookies(token);
            HttpHeaders headers = new HttpHeaders();
            addCookiesToHeader(headers, cookie);
            return new ResponseEntity<>(userDTO, headers, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "Failed to register user.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO authRequestDTO) {
        try {
            authenticateUser(authRequestDTO.getEmail(), authRequestDTO.getPassword());
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequestDTO.getEmail());
            String token = jwtUtils.generateToken(userDetails.getUsername());
            UserDTO userDTO = userService.getUserByEmail(authRequestDTO.getEmail());
            ResponseCookie cookie = generateCookies(token);
            HttpHeaders headers = new HttpHeaders();
            addCookiesToHeader(headers, cookie);
            return new ResponseEntity<>(userDTO, headers, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "Failed to login user.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        try {
            ResponseCookie cookie = generateCookies(null);
            HttpHeaders headers = new HttpHeaders();
            addCookiesToHeader(headers, cookie);
            ResponseWithMessageDTO response = new ResponseWithMessageDTO("User is logged out.");
            return new ResponseEntity<>(response, headers, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "Failed to logout user.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NOT_FOUND);
        }
    }

    private void authenticateUser(String email, String password) throws Exception {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,
                password);
        try {
            authenticationManager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Username or Password!");
        } catch (AuthenticationException e) {
            throw new Exception(e);
        }
    }

    private ResponseCookie generateCookies(String jwt) {
        ResponseCookie cookie = ResponseCookie.from("auth_token", jwt)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .build();
        return cookie;
    }

    private void addCookiesToHeader(HttpHeaders headers, ResponseCookie cookie) {
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
