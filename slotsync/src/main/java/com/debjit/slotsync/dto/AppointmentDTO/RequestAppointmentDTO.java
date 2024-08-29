package com.debjit.slotsync.dto.AppointmentDTO;

import java.util.Date;

import com.debjit.slotsync.dto.SlotDTO;
import com.debjit.slotsync.enums.AppointmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestAppointmentDTO {
    private String id;
    private String name;
    private String createdById;
    private String participantId;
    private AppointmentStatus status;
    private Date scheduledOn;
    private SlotDTO slot;
    private Date updatedAt;
    private Date createdAt;
}
