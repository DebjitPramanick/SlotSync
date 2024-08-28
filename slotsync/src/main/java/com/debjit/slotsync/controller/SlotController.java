package com.debjit.slotsync.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.slotsync.dto.AppointmentDTO;
import com.debjit.slotsync.dto.ResponseWithMessageDTO;
import com.debjit.slotsync.dto.SlotDTO;
import com.debjit.slotsync.enums.SlotSequence;
import com.debjit.slotsync.service.AppointmentService;
import com.debjit.slotsync.service.SlotService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081/", allowCredentials = "true")
public class SlotController {

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    SlotService slotService;

    @GetMapping("/users/{userId}/slots")
    public ResponseEntity<?> getSlots(HttpServletRequest request, @RequestParam(name = "date") String date,
            @PathVariable(name = "userId") String userId) {
        try {
            Date scheduledOn = new SimpleDateFormat("yyyy-MM-dd").parse(date);
            List<AppointmentDTO> alreadyBookedAppointments = appointmentService
                    .getAppointmentsByScheduledDate(userId, scheduledOn);
            List<SlotSequence> sequencesToIgnore = new ArrayList<>();
            for (AppointmentDTO appo : alreadyBookedAppointments) {
                sequencesToIgnore.add(appo.getSlot().getSequence());
            }
            List<SlotDTO> slots = slotService.generateSlots(sequencesToIgnore, scheduledOn);
            return new ResponseEntity<>(slots, HttpStatus.OK);

        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No user found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }

}
