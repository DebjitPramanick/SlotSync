package com.debjit.slotsync.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Component;

import com.debjit.slotsync.dto.SlotDTO;
import com.debjit.slotsync.enums.SlotSequence;

@Component
public class SlotService {
    public List<SlotDTO> generateSlots(List<SlotSequence> sequencesToIgnore, Date dateToSchedule) {
        List<SlotDTO> slots = new ArrayList<>();

        for (SlotSequence seq : SlotSequence.values()) {
            if (sequencesToIgnore.contains(seq)) {
                continue;
            } else {
                slots.add(generateSlotBySequence(seq, dateToSchedule));
            }
        }
        return slots;
    }

    private SlotDTO generateSlotBySequence(SlotSequence sequence, Date dateToSchedule) {
        SlotDTO slot = new SlotDTO();
        Integer durationInMinutes = 30;
        slot.setDurationInMinutes(30);
        Calendar date = new GregorianCalendar();
        date.setTime(dateToSchedule);
        date.set(Calendar.MINUTE, 0);
        Date startDate = null;
        Date enDate = null;
        if (sequence == SlotSequence.FIRST) {
            slot.setSequence(sequence);
            date.set(Calendar.HOUR_OF_DAY, 15);
            startDate = date.getTime();
            date.add(Calendar.MINUTE, durationInMinutes);
            enDate = date.getTime();
        } else if (sequence == SlotSequence.SECOND) {
            slot.setSequence(sequence);
            date.set(Calendar.HOUR_OF_DAY, 16);
            startDate = date.getTime();
            date.add(Calendar.MINUTE, durationInMinutes);
            enDate = date.getTime();
        } else if (sequence == SlotSequence.THIRD) {
            slot.setSequence(sequence);
            date.set(Calendar.HOUR_OF_DAY, 17);
            startDate = date.getTime();
            date.add(Calendar.MINUTE, durationInMinutes);
            enDate = date.getTime();
        } else if (sequence == SlotSequence.FOURTH) {
            slot.setSequence(sequence);
            date.set(Calendar.HOUR_OF_DAY, 18);
            startDate = date.getTime();
            date.add(Calendar.MINUTE, durationInMinutes);
            enDate = date.getTime();
        } else if (sequence == SlotSequence.FIFTH) {
            slot.setSequence(sequence);
            date.set(Calendar.HOUR_OF_DAY, 19);
            startDate = date.getTime();
            date.add(Calendar.MINUTE, durationInMinutes);
            enDate = date.getTime();
        } else if (sequence == SlotSequence.SIXTH) {
            slot.setSequence(sequence);
            date.set(Calendar.HOUR_OF_DAY, 20);
            startDate = date.getTime();
            date.add(Calendar.MINUTE, durationInMinutes);
            enDate = date.getTime();
        }

        slot.setStartTime(startDate);
        slot.setEndTime(enDate);

        return slot;
    }
}
