package com.debjit.slotsync.dto.AppointmentDTO;

import java.util.Date;

import com.debjit.slotsync.dto.SlotDTO;
import com.debjit.slotsync.dto.UserDTO;
import com.debjit.slotsync.enums.AppointmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseAppointmentDTO {
    private String id;
    private String name;
    private UserDTO createdBy;
    private UserDTO participant;
    private AppointmentStatus status;
    private Date scheduledOn;
    private SlotDTO slot;
    private Date updatedAt;
    private Date createdAt;
}
