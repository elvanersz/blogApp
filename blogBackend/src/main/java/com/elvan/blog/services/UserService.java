package com.elvan.blog.services;

import com.elvan.blog.entities.User;
import com.elvan.blog.repositories.CommentRepository;
import com.elvan.blog.repositories.LikeRepository;
import com.elvan.blog.repositories.PostRepository;
import com.elvan.blog.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private LikeRepository likeRepository;
    private CommentRepository commentRepository;
    private PostRepository postRepository;


    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getOneUser(Long userId){
        return userRepository.findById(userId).orElse(null);
    }

    public User createOneUser(User newUser){
        return userRepository.save(newUser);
    }

    public User updateOneUser(Long userId, User newUser){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            User foundUser = user.get();
            foundUser.setUsername(newUser.getUsername());
            foundUser.setPassword(newUser.getPassword());
            foundUser.setAvatarId(newUser.getAvatarId());
            userRepository.save(foundUser);
            return foundUser;
        }else {
            return null;
        }
    }

    public void deleteOneUser(Long userId){
        userRepository.deleteById(userId);
    }

    public User getOneUserByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    public List<Object> getUserActivity(Long userId) {
        List<Long> postIds = postRepository.findTopByUserId(userId);
        if(postIds.isEmpty()){
            return null;
        }else{
            List<Object> comments = commentRepository.findUserCommentsByPostId(postIds);
            List<Object> likes = likeRepository.findUserLikesByPostId(postIds);
            List<Object> result = new ArrayList<>();
            result.addAll(comments);
            result.addAll(likes);
            return result;
        }
    }
}