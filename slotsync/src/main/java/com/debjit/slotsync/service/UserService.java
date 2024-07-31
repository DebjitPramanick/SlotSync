package com.debjit.slotsync.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.slotsync.dto.UserDTO;
import com.debjit.slotsync.model.User;
import com.debjit.slotsync.repository.UserRepository;

@Component
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserDTO getUserById(String id) {
        try {
            User user = userRepository.findById(id).get();
            if (user == null) {
                return null;
            }
            return convertToUserDTO(user);
        } catch (Exception e) {
            throw e;
        }
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setEmail(user.getEmail());
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setCreatedAt(user.getCreatedAt());

        return userDTO;
    }
}
