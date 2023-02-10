package com.elvan.vlog.controllers;

import com.elvan.vlog.entities.Post;
import com.elvan.vlog.requests.PostCreateRequest;
import com.elvan.vlog.requests.PostUpdateRequest;
import com.elvan.vlog.responses.PostResponse;
import com.elvan.vlog.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

    private PostService postService;


    @GetMapping
    public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
    }

    @GetMapping("/{postId}")
    public Post getOnePost(@PathVariable Long postId){
        return postService.getOnePost(postId);
    }

    @PostMapping
    public Post createOnePost(@RequestBody PostCreateRequest newPostRequest){
        return postService.createOnePost(newPostRequest);
    }

    @PutMapping("/{postId}")
    public Post updateOnePost(@PathVariable Long postId, @RequestBody PostUpdateRequest postUpdateRequest){
        return postService.updateOnePost(postId, postUpdateRequest);
    }

    @DeleteMapping("/{postId}")
    public void deleteOnePsot(@PathVariable Long postId){
        postService.deleteOnePost(postId);
    }
}