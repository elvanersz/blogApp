package com.elvan.vlog.services;

import com.elvan.vlog.entities.Like;
import com.elvan.vlog.entities.Post;
import com.elvan.vlog.entities.User;
import com.elvan.vlog.repositories.LikeRepository;
import com.elvan.vlog.requests.LikeCreateRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {

    private LikeRepository likeRepository;
    private UserService userService;
    private PostService postService;


    public List<Like> getAllLikes(@RequestParam Optional<Long> userId,
                                  @RequestParam Optional<Long> postId){
        if(userId.isPresent() && postId.isPresent()){
            return likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
        }else if(userId.isPresent()){
            return likeRepository.findByUserId(userId.get());
        }else if(postId.isPresent()){
            return likeRepository.findByPostId(postId.get());
        }else{
            return likeRepository.findAll();
        }
    }

    public Like getOneLike(Long LikeId) {
        return likeRepository.findById(LikeId).orElse(null);
    }

    public Like createOneLike(LikeCreateRequest likeCreateRequest) {
        User user = userService.getOneUser(likeCreateRequest.getUserId());
        Post post = postService.getOnePost(likeCreateRequest.getPostId());
        if(user != null && post != null) {
            Like likeToSave = new Like();
            likeToSave.setId(likeCreateRequest.getId());
            likeToSave.setPost(post);
            likeToSave.setUser(user);
            return likeRepository.save(likeToSave);
        }else
            return null;
    }

    public void deleteOneLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}