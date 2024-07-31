package com.debjit.slotsync.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDTO {
    private String id;
    private String name;
    private Integer duration;
    private String participantId;
    private boolean isFinished;
    private boolean isCanceled;
    private String scheduledOn;
    private Date updatedAt;
    private Date createdAt;
}
