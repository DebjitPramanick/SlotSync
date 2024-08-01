package com.debjit.slotsync.service;

import java.util.Date;

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

    public UserDTO getUserByEmail(String email) throws Exception {
        try {
            User user = userRepository.findOneByEmail(email);
            if (user == null) {
                return null;
            }
            return convertToUserDTO(user);
        } catch (Exception e) {
            throw e;
        }
    }

    public UserDTO createUser(UserDTO userDTO) throws Exception {
        try {
            User user = new User();
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());
            user.setName(userDTO.getName());
            user.setCreatedAt(new Date(System.currentTimeMillis()));
            user = userRepository.save(user);
            return convertToUserDTO(user);
        } catch (Exception e) {
            throw new Exception("Failed to create user.");
        }
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setName(user.getName());
        userDTO.setCreatedAt(user.getCreatedAt());

        return userDTO;
    }
}
