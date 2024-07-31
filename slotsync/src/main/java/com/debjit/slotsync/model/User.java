package com.debjit.slotsync.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private Date createdAt;
    private Date updatedAt;
}
