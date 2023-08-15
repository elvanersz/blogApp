package com.elvan.blog.controllers;

import com.elvan.blog.entities.Post;
import com.elvan.blog.requests.PostCreateRequest;
import com.elvan.blog.requests.PostUpdateRequest;
import com.elvan.blog.responses.PostResponse;
import com.elvan.blog.services.PostService;
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
    public PostResponse getOnePost(@PathVariable Long postId){
        return postService.getOnePostByIdWithLikes(postId);
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