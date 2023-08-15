import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function Comment(props){
    const {userId, userName, text} = props;

    return (
        <CardContent>
            <OutlinedInput 
            disabled
            id="outlined-adornment-amount"
            multiline
            inputProps = {{ maxLength : 250 }}
            fullWidth
            value = {text}
            startAdornment = {
                <InputAdornment position="start">
                    <Link to={{pathname: "/users/" + userId}} style={{ textDecoration: 'none', color:"inherit" }}>
                        <Avatar style={{ background: "linear-gradient(45deg, #2196F3 25%, #21CBF3 90%" }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                </InputAdornment>
            }
            style = {{ color: "black", backgroundColor: "white" }}>
            </OutlinedInput>
        </CardContent>
    )
}

export default Comment;