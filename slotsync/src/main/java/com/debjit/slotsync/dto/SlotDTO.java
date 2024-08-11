package com.debjit.slotsync.dto;

import java.util.Date;

import com.debjit.slotsync.enums.SlotSequence;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SlotDTO {
    Date startTime;
    Date endTime;
    Integer durationInMinutes;
    SlotSequence sequence;
}
