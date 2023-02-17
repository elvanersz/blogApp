package com.elvan.vlog.services;

import com.elvan.vlog.entities.Comment;
import com.elvan.vlog.entities.Post;
import com.elvan.vlog.entities.User;
import com.elvan.vlog.repositories.CommentRepository;
import com.elvan.vlog.requests.CommentCreateRequest;
import com.elvan.vlog.requests.CommentUpdateRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService {

    private CommentRepository commentRepository;
    private UserService userService;
    private PostService postService;


    public List<Comment> getAllComments(@RequestParam Optional<Long> userId,
                                        @RequestParam Optional<Long> postId){
        if(userId.isPresent() && postId.isPresent()){
            return commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        }else if(userId.isPresent()){
            return commentRepository.findByUserId(userId.get());
        }else if(postId.isPresent()){
            return commentRepository.findByPostId(postId.get());
        }else{
            return commentRepository.findAll();
        }
    }

    public Comment getOneComment(Long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    public Comment createOneComment(CommentCreateRequest newCommentRequest) {
        User user = userService.getOneUser(newCommentRequest.getUserId());
        Post post = postService.getOnePost(newCommentRequest.getPostId());

        if(user != null && post != null){
            Comment toSave = new Comment();
            toSave.setId(newCommentRequest.getId());
            toSave.setPost(post);
            toSave.setUser(user);
            toSave.setText(newCommentRequest.getText());
            toSave.setCreateDate(new Date());
            return commentRepository.save(toSave);
        }else{
            return null;
        }
    }

    public Comment updateOneComment(Long commentId, CommentUpdateRequest commentUpdateRequest) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isPresent()){
            Comment toUpdate = comment.get();
            toUpdate.setText(commentUpdateRequest.getText());
            return commentRepository.save(toUpdate);
        }else{
            return null;
        }
    }

    public void deleteOneComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}