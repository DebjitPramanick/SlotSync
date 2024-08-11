package com.debjit.slotsync.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.slotsync.dto.AppointmentDTO;
import com.debjit.slotsync.enums.AppointmentStatus;
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

    public List<AppointmentDTO> getAppointmentsByScheduledDate(String userId, Date scheduledOn) {
        try {
            List<Appointment> appointments = appointmentRepository.findByIdAndScheduledOn(userId, scheduledOn);
            List<AppointmentDTO> results = new ArrayList<>();
            for (Appointment appo : appointments) {
                results.add(convertToAppointmentDTO(appo));
            }
            return results;
        } catch (Exception e) {
            throw e;
        }
    }

    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) throws Exception {
        try {
            Appointment appointment = new Appointment();
            appointment.setName(appointmentDTO.getName());
            appointment.setSlot(appointmentDTO.getSlot());
            appointment.setScheduledOn(appointmentDTO.getScheduledOn());
            appointment.setCreatedBy(appointmentDTO.getCreatedBy());
            appointment.setParticipantId(appointmentDTO.getParticipantId());
            appointment.setStatus(AppointmentStatus.SCHEDULED);
            appointment.setCreatedAt(new Date(System.currentTimeMillis()));

            appointment = appointmentRepository.save(appointment);
            return convertToAppointmentDTO(appointment);
        } catch (Exception e) {
            throw new Exception("Failed to create appointment.");
        }
    }

    private AppointmentDTO convertToAppointmentDTO(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setId(appointment.getId());
        appointmentDTO.setName(appointment.getName());
        appointmentDTO.setScheduledOn(appointment.getScheduledOn());
        appointmentDTO.setSlot(appointment.getSlot());
        appointmentDTO.setCreatedBy(appointment.getCreatedBy());
        appointmentDTO.setParticipantId(appointment.getParticipantId());
        appointmentDTO.setStatus(appointment.getStatus());
        appointmentDTO.setUpdatedAt(appointment.getUpdatedAt());
        appointmentDTO.setCreatedAt(appointment.getCreatedAt());

        return appointmentDTO;
    }
}
