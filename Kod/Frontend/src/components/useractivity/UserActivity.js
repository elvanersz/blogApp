import React, {useState, useEffect} from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Post from "../post/Post";


const columns = [
  { id: 'User Activities', label: 'Notifications', minWidth: 170, align:"left" }
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  

function PopUp(props){
  const [open, setOpen] = React.useState(false);
  const {isOpen, postId, setIsOpen} = props;
  const [post, setPost] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const getPost = () => {
    fetch("/posts/"+postId, {
      headers: {
        "Authorization": localStorage.getItem("tokenKey")
      }, 
    })
    .then(res => res.json())
    .then(
      (result) => {
        setPost(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])

  useEffect(() => {
    getPost();
  }, [postId])


  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {post? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text}></Post>: "loading"}
      </Dialog>
    </div>
  );
}


function UserActivity(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const {userId} = props; 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


  const getActivity = () => {
    fetch("/users/activity/"+userId, {
      headers: {
        "Authorization": localStorage.getItem("tokenKey")
      }, 
    })
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setRows(result)
      },
      (error) => {
        console.log(error)
        setIsLoaded(true)
        setError(error);
      }
    )
  }

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  }

  useEffect(() => {
    getActivity()
  }, [])


  return (
    <div>{isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
    <Paper sx={{ width: 1000, overflow: 'hidden', marginLeft:10 }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Button onClick={() => handleNotification(row[1])}>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {row[3] + " " + row[0] + " your post"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </Button>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
}

export default UserActivity;