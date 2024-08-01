package com.debjit.slotsync.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

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
    private Integer duration;
    private String participantId;
    private String createdBy;
    private AppointmentStatus status;
    private String scheduledOn;
    private Date updatedAt;
    private Date createdAt;
}
