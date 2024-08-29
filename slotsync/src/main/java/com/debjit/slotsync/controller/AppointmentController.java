package com.debjit.slotsync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.slotsync.dto.ResponseWithMessageDTO;
import com.debjit.slotsync.dto.AppointmentDTO.RequestAppointmentDTO;
import com.debjit.slotsync.dto.AppointmentDTO.ResponseAppointmentDTO;
import com.debjit.slotsync.service.AppointmentService;
import com.debjit.slotsync.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081", allowCredentials = "true")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    @Autowired
    UserService userService;

    @GetMapping("/appointments")
    public ResponseEntity<?> getAppointments(HttpServletRequest request) {
        try {
            String loggedInUserId = request.getAttribute("user_id").toString();
            List<ResponseAppointmentDTO> appointments = appointmentService.getAppointmentsCreatedByUser(loggedInUserId);
            return new ResponseEntity<>(appointments, HttpStatus.CREATED);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "Failed to create appointment.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/appointments/book")
    public ResponseEntity<?> bookAppointment(HttpServletRequest request,
            @RequestBody RequestAppointmentDTO appointmentDTO) {
        try {
            String loggedInUserId = request.getAttribute("user_id").toString();
            appointmentDTO.setCreatedById(loggedInUserId);
            ResponseAppointmentDTO responseAppointmentDTO = appointmentService.createAppointment(appointmentDTO);
            return new ResponseEntity<>(responseAppointmentDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "Failed to create appointment.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/appointments/update/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable String id,
            @RequestBody RequestAppointmentDTO appointmentDTO) {
        try {
            appointmentDTO.setId(id);
            ResponseAppointmentDTO responseAppointmentDTO = appointmentService.updateAppointment(appointmentDTO);
            return new ResponseEntity<>(responseAppointmentDTO, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "Failed to update appointment.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NOT_FOUND);
        }
    }
}
