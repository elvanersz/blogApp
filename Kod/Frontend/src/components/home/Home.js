import React, {useState, useEffect} from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";
import './Home.css';

function Home(){

    const[error, setError] = useState(null)
    const[isLoaded, setIsLoaded] = useState(false)
    const[postList, setPostList] = useState([])

    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setPostList(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }

    useEffect(() => {
        refreshPosts()
    }, [postList])

    if(error){
        return <div>Error !!!</div>
    }else if(!isLoaded){
        return <div>Loading...</div>
    }else{
        return(
            <div style={{ backgroundColor: "#cce6ff" }}>
                <PostForm userId={1} userName={"ddd"} refreshPosts = {refreshPosts}></PostForm>
                <br />
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} text={post.text} title={post.title}></Post>
                ))}
            </div>
        );
    }
}

export default Home;