package com.elvan.blog.responses;

import com.elvan.blog.entities.Comment;
import lombok.Data;

@Data
public class CommentResponse {

    long id;
    Long userId;
    String username;
    String text;

    public CommentResponse(Comment entity){
        this.id = entity.getId();
        this.userId = entity.getUser().getId();
        this.username = entity.getUser().getUsername();
        this.text = entity.getText();
    }
}