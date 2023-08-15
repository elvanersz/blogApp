import { CardContent, InputAdornment, OutlinedInput, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function CommentForm(props){
    const {userId, postId, setCommentRefresh} = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            }, 
            body: JSON.stringify({
                postId: postId,
                userId: localStorage.getItem("currentUser"),
                text: text
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
        window.location.reload(true)
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent>
            <OutlinedInput 
            id="outlined-adornment-amount"
            multiline
            inputProps = {{ maxLength : 250 }}
            fullWidth
            onChange={(i) => handleChange(i.target.value)}
            startAdornment = {
                <InputAdornment position="start">
                    <Link to={{pathname: "/users/" + userId}} style={{ textDecoration: 'none', color:"inherit" }}>
                        <Avatar style={{ background: "linear-gradient(45deg, #2196F3 25%, #21CBF3 90%" }} aria-label="recipe">
                            {localStorage.getItem("username").charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                </InputAdornment>
            }
            endAdornment = {
                <InputAdornment position = "end">
                <Button
                    variant = "contained"
                    style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white'}}
                    onClick = {handleSubmit}
                >SEND</Button>
                </InputAdornment>
            }
            value = {text}
            style = {{ color: "black", backgroundColor: "white" }}>
                
            </OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;