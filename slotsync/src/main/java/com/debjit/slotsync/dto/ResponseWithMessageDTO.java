package com.debjit.slotsync.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseWithMessageDTO {
    String message;

    public ResponseWithMessageDTO(String message) {
        this.message = message;
    }
}
