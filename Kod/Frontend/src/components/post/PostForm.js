import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, InputAdornment } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function PostForm(props){
    const {userId, userName, refreshPosts} = props;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = () => {
        savePost();
        refreshPosts();
        setTitle("");
        setText("");
        setIsSent(true);
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            }, 
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return(
        <div>
            <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your post is sent!
                </Alert>
            </Snackbar>

            <Card sx={{ width: "60%", textAlign:"left", marginTop:3, marginLeft:"20%"}}>
                <CardHeader
                    avatar={
                    <Link to={{pathname: "/users/" + userId}} style={{ textDecoration: 'none', color:"inherit" }}>
                        <Avatar style={{ background: "linear-gradient(45deg, #2196F3 25%, #21CBF3 90%" }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                    }
                    title={<OutlinedInput 
                    id="outlined-adornment-amount"
                    multiline
                    placeholder="Title"
                    inputProps = {{ maxLength : 25 }}
                    fullWidth
                    value = {title}
                    onChange={ (i) => handleTitle( i.target.value) }>
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput 
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Text"
                        inputProps = {{ maxLength : 250 }}
                        fullWidth
                        value = {text}
                        onChange={ (i) => handleText( i.target.value) }
                        endAdornment = {
                            <InputAdornment position="end">
                                <Button
                                variant="contained"
                                style={{ background: "linear-gradient(45deg, #2196F3 25%, #21CBF3 90%",
                                color:"white" }}
                                onClick = {handleSubmit}>
                                    SEND
                                </Button>
                            </InputAdornment>
                        }>
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostForm;