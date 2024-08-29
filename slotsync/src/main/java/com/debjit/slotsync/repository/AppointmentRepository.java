package com.debjit.slotsync.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.debjit.slotsync.model.Appointment;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    public List<Appointment> findByCreatedBy(String userId, Sort sort);

    public List<Appointment> findByParticipantId(String userId, Sort sort);

    @Query("{$and: [{$or: [{createdBy: ?0}, {participantId: ?0}]}, {scheduledOn: {$gte: ?1, $lt: ?2}}]}")
    public List<Appointment> findByUserIdWithinDateRange(String id, Date start, Date end, Sort sort);
}
