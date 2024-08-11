package com.debjit.slotsync.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import com.debjit.slotsync.dto.SlotDTO;
import com.debjit.slotsync.enums.AppointmentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "appointments")
public class Appointment {
    private String id;
    private String name;
    private String participantId;
    private String createdBy;
    private AppointmentStatus status;
    private SlotDTO slot;
    private Date scheduledOn;
    private Date updatedAt;
    private Date createdAt;
}
