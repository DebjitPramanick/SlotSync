package com.debjit.slotsync.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.debjit.slotsync.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
