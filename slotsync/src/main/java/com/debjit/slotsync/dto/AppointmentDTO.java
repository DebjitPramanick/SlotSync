package com.debjit.slotsync.dto;

import java.util.Date;

import com.debjit.slotsync.enums.AppointmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDTO {
    private String id;
    private String name;
    private String createdBy;
    private String participantId;
    private AppointmentStatus status;
    private Date scheduledOn;
    private SlotDTO slot;
    private Date updatedAt;
    private Date createdAt;
}
