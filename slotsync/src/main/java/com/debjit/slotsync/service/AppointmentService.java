package com.debjit.slotsync.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.slotsync.dto.AppointmentDTO;
import com.debjit.slotsync.model.Appointment;
import com.debjit.slotsync.repository.AppointmentRepository;

@Component
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    public AppointmentDTO getAppointmentById(String id) {
        try {
            Appointment appointment = appointmentRepository.findById(id).get();
            if (appointment == null) {
                return null;
            }
            return convertToAppointmentDTO(appointment);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<AppointmentDTO> getAppointmentsCreatedByUser(String userId) {
        try {
            List<Appointment> appointments = appointmentRepository.findByCreatedBy(userId);
            List<AppointmentDTO> results = new ArrayList<>();
            for (Appointment appo : appointments) {
                results.add(convertToAppointmentDTO(appo));
            }
            return results;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<AppointmentDTO> getAppointmentsByParticipant(String userId) {
        try {
            List<Appointment> appointments = appointmentRepository.findByParticipantId(userId);
            List<AppointmentDTO> results = new ArrayList<>();
            for (Appointment appo : appointments) {
                results.add(convertToAppointmentDTO(appo));
            }
            return results;
        } catch (Exception e) {
            throw e;
        }
    }

    private AppointmentDTO convertToAppointmentDTO(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();

        return appointmentDTO;
    }
}
