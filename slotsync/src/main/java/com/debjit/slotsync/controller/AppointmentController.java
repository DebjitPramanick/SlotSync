package com.debjit.slotsync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.slotsync.service.AppointmentService;

@Component
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;
}
