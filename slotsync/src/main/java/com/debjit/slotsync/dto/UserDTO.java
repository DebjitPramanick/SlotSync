package com.debjit.slotsync.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String password;
    private Date createdAt;
    private Date updatedAt;
}
