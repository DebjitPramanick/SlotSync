package com.debjit.slotsync.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.debjit.slotsync.model.Appointment;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    public List<Appointment> findByCreatedBy(String userId);

    public List<Appointment> findByParticipantId(String userId);

    public List<Appointment> findByIdAndScheduledOn(String id, Date scheduledOn);
}
