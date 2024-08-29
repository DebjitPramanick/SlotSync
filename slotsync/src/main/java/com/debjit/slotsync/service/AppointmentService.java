package com.debjit.slotsync.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.debjit.slotsync.dto.UserDTO;
import com.debjit.slotsync.dto.AppointmentDTO.RequestAppointmentDTO;
import com.debjit.slotsync.dto.AppointmentDTO.ResponseAppointmentDTO;
import com.debjit.slotsync.enums.AppointmentStatus;
import com.debjit.slotsync.model.Appointment;
import com.debjit.slotsync.repository.AppointmentRepository;

@Component
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    UserService userService;

    public ResponseAppointmentDTO getAppointmentById(String id) {
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

    public List<ResponseAppointmentDTO> getAppointmentsCreatedByUser(String userId) {
        try {
            List<Appointment> appointments = appointmentRepository.findByCreatedBy(userId,
                    Sort.by(Sort.Direction.DESC, "scheduledOn"));
            List<ResponseAppointmentDTO> results = new ArrayList<>();
            for (Appointment appo : appointments) {
                results.add(convertToAppointmentDTO(appo));
            }
            return results;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<ResponseAppointmentDTO> getAppointmentsByParticipant(String userId) {
        try {
            List<Appointment> appointments = appointmentRepository.findByParticipantId(userId,
                    Sort.by(Sort.Direction.DESC, "scheduledOn"));
            List<ResponseAppointmentDTO> results = new ArrayList<>();
            for (Appointment appo : appointments) {
                results.add(convertToAppointmentDTO(appo));
            }
            return results;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<ResponseAppointmentDTO> getAppointmentsByScheduledDate(String userId, Date scheduledOn) {
        try {
            Date[] dateRanges = new Date[2];
            dateRanges[0] = scheduledOn;
            Calendar endDate = new GregorianCalendar();
            endDate.setTime(scheduledOn);
            endDate.add(Calendar.DAY_OF_MONTH, 1);
            dateRanges[1] = endDate.getTime();
            List<Appointment> appointments = appointmentRepository.findByUserIdWithinDateRange(userId, dateRanges[0],
                    dateRanges[1], Sort.by(Sort.Direction.DESC, "scheduledOn"));
            List<ResponseAppointmentDTO> results = new ArrayList<>();
            for (Appointment appo : appointments) {
                results.add(convertToAppointmentDTO(appo));
            }
            return results;
        } catch (Exception e) {
            throw e;
        }
    }

    public ResponseAppointmentDTO createAppointment(RequestAppointmentDTO appointmentDTO) throws Exception {
        try {
            Appointment appointment = new Appointment();
            appointment.setName(appointmentDTO.getName());
            appointment.setSlot(appointmentDTO.getSlot());
            appointment.setScheduledOn(appointmentDTO.getScheduledOn());
            appointment.setCreatedBy(appointmentDTO.getCreatedById());
            appointment.setParticipantId(appointmentDTO.getParticipantId());
            appointment.setStatus(AppointmentStatus.SCHEDULED);
            appointment.setCreatedAt(new Date(System.currentTimeMillis()));

            appointment = appointmentRepository.save(appointment);
            return convertToAppointmentDTO(appointment);
        } catch (Exception e) {
            throw new Exception("Failed to create appointment.");
        }
    }

    public ResponseAppointmentDTO updateAppointment(RequestAppointmentDTO appointmentDTO) throws Exception {
        try {
            Appointment appointment = appointmentRepository.findById(appointmentDTO.getId()).get();
            appointment.setId(appointmentDTO.getId());
            if (appointmentDTO.getName() != null) {
                appointment.setName(appointmentDTO.getName());
            }
            if (appointmentDTO.getSlot() != null) {
                appointment.setSlot(appointmentDTO.getSlot());
            }
            if (appointmentDTO.getSlot() != null) {
                appointment.setSlot(appointmentDTO.getSlot());
            }
            if (appointmentDTO.getScheduledOn() != null) {
                appointment.setScheduledOn(appointmentDTO.getScheduledOn());
            }
            if (appointmentDTO.getStatus() != null) {
                appointment.setStatus(appointmentDTO.getStatus());
            }
            appointment.setUpdatedAt(new Date(System.currentTimeMillis()));

            appointment = appointmentRepository.save(appointment);
            return convertToAppointmentDTO(appointment);
        } catch (Exception e) {
            throw new Exception("Failed to update appointment.");
        }
    }

    private ResponseAppointmentDTO convertToAppointmentDTO(Appointment appointment) {
        ResponseAppointmentDTO appointmentDTO = new ResponseAppointmentDTO();
        UserDTO createdByUser = userService.getUserById(appointment.getCreatedBy());
        UserDTO participant = userService.getUserById(appointment.getParticipantId());
        appointmentDTO.setId(appointment.getId());
        appointmentDTO.setName(appointment.getName());
        appointmentDTO.setScheduledOn(appointment.getScheduledOn());
        appointmentDTO.setSlot(appointment.getSlot());
        appointmentDTO.setCreatedBy(createdByUser);
        appointmentDTO.setParticipant(participant);
        appointmentDTO.setStatus(appointment.getStatus());
        appointmentDTO.setUpdatedAt(appointment.getUpdatedAt());
        appointmentDTO.setCreatedAt(appointment.getCreatedAt());

        return appointmentDTO;
    }
}
