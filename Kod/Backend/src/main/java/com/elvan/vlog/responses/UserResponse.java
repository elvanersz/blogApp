package com.elvan.vlog.responses;

import com.elvan.vlog.entities.User;
import lombok.Data;

@Data
public class UserResponse {

    long id;
    int avatarId;
    String username;

    public UserResponse(User entity){
        this.id = entity.getId();
        this.avatarId = entity.getAvatarId();
        this.username = entity.getUsername();
    }
}
