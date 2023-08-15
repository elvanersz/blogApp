package com.elvan.blog.services;

import com.elvan.blog.entities.Comment;
import com.elvan.blog.entities.Post;
import com.elvan.blog.entities.User;
import com.elvan.blog.repositories.CommentRepository;
import com.elvan.blog.requests.CommentCreateRequest;
import com.elvan.blog.requests.CommentUpdateRequest;
import com.elvan.blog.responses.CommentResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentService {

    private CommentRepository commentRepository;
    private UserService userService;
    private PostService postService;


    public List<CommentResponse> getAllComments(@RequestParam Optional<Long> userId,
                                                @RequestParam Optional<Long> postId){
        List<Comment> commentList;
        if(userId.isPresent() && postId.isPresent()){
            commentList = commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        }else if(userId.isPresent()){
            commentList = commentRepository.findByUserId(userId.get());
        }else if(postId.isPresent()){
            commentList = commentRepository.findByPostId(postId.get());
        }else{
            commentList = commentRepository.findAll();
        }
        return commentList.stream().map(comment -> new CommentResponse(comment)).collect(Collectors.toList());
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