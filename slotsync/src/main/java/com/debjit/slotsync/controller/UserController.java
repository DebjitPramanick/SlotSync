package com.debjit.slotsync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.slotsync.dto.ResponseWithMessageDTO;
import com.debjit.slotsync.dto.UserDTO;
import com.debjit.slotsync.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081/", allowCredentials = "true")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getLoggedInUser(HttpServletRequest request) {
        try {
            String loggedInUserId = request.getAttribute("user_id").toString();
            UserDTO user = userService.getUserById(loggedInUserId);

            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            throw new Exception();
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No user found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<?> getLoggedInUser(HttpServletRequest request, @RequestParam(name = "query") String query) {
        try {
            String loggedInUserId = request.getAttribute("user_id").toString();
            List<UserDTO> users = userService.getUserByQuery(query);
            users = users.stream().filter(user -> !user.getId().equals(loggedInUserId))
                    .toList();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No user found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }
}
