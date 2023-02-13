import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";


function Navbar(){
    const onClick = () =>{
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("username")
        window.location.reload(true)
    }

    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ textAlign:"left" }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color:"inherit"}}>HOME</Link>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {localStorage.getItem("currentUser") == null ? <Link to="/auth" style={{ textDecoration: 'none', color:"inherit" }}>LOGİN/REGİSTER</Link>: 
                        <div>
                            <IconButton onClick={onClick}><LockOpen sx={{ marginBottom:1, marginRight:1, color: "white", title:"LOG OUT" }}></LockOpen></IconButton>
                            <Link to={{pathname: "/users/" + localStorage.getItem("currentUser")}} style={{ textDecoration: 'none', color:"inherit" }}>PROFİLE</Link>
                        </div>}
                        
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;