import React, {useState, useRef, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Container from '@mui/material/Container';
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
const { expand, ...other } = props;
return <IconButton {...other} />;
})(({ theme, expand }) => ({
marginLeft: 'auto',
transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
}),
}));


function Post(props){
    const {text, title, userId, userName, postId, likes} = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);
    const isInitialMount = useRef(true);
    const [refresh, setRefresh] = useState(false);
    let disabled = localStorage.getItem("currentUser") == null ? true:false


    const setCommentRefresh = () => {
        setRefresh(true);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike()
            setLikeCount(likeCount + 1)
        }else{
            deleteLike()
            setLikeCount(likeCount - 1)
        }
    }

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setCommentList(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
        setRefresh(false);
    }

    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            }, 
            body: JSON.stringify({
                postId: postId,
                userId: localStorage.getItem("currentUser")
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("/likes/" + likeId, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("tokenKey")
            },
        })
        .catch((err) => console.log(err))
    }

    const checkLikes = () => {
        var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")))
        
        if(likeControl != null){
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }else{
            refreshComments()
        }
    }, [refresh])

    useEffect(() => {checkLikes()

    }, [])


    return(
        <div>
            <Card sx={{ width: "60%", textAlign:"left", margin:4, marginLeft:"20%"}}>
                <CardHeader
                    avatar={
                    <Link to={{pathname: "/users/" + userId}} style={{ textDecoration: 'none', color:"inherit" }}>
                        <Avatar style={{ background: "linear-gradient(45deg, #2196F3 25%, #21CBF3 90%" }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ?
                    <IconButton disabled onClick={handleLike} aria-label="add to favorites">
                        <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton> :
                    <IconButton onClick={handleLike} aria-label="add to favorites">
                        <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton>
                    }
                    {likeCount}
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                        {error? "error" :
                        isLoaded? commentList.map(comment => (
                        <Comment userId = {comment.userId} userName = {comment.username} text = {comment.text}></Comment>
                        )) : "Loading"}
                    </Container>
                    {disabled ? "":
                    <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("username")} postId = {postId} setCommentRefresh={setCommentRefresh}></CommentForm>}
                </Collapse>
            </Card>
        </div>
    )
}

export default Post;