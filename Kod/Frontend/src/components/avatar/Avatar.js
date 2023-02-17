import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';

function Avatara(props){
    const {avatarId} = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);
    
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        saveAvatar();
    }
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const saveAvatar = () => {
        fetch("/users/"+localStorage.getItem("currentUser"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            }, 
            body: JSON.stringify({
                avatarId: selectedValue
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    
    return(
        <div>
            <Card style={{ maxWidth:345, margin: "auto", height: 700 }}>
                <CardMedia
                    sx={{ height: 400 }}
                    image={`/avatars/avatar${selectedValue}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        UserName
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User InfoUser InfoUser InfoUser InfoUser InfoUser InfoUser InfoUser Info
                        UseUser InfoUser InfoUser InfoUser Info
                        User InfoUser InfoUser InfoUser InfoUser InfoUser InfoUser InfoUser Info
                        UseUser InfoUser InfoUser InfoUser Info
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleOpen} size="small">Change Avatar</Button>
                </CardActions>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <List dense sx={{ marginTop:20.5, height: 530, width: 260, bgcolor: '#cce6ff' }}>
                {[1, 2, 3, 4, 5, 6].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                    <ListItem
                        key={value}
                        secondaryAction={
                        <Radio
                        edge="end"
                        value= {value}
                        onChange={handleChange}
                        checked={""+selectedValue === ""+value}
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <Avatar
                            style={{ height:80, width:80 }}
                            alt={`Avatar n°${value}`}
                            src={`/avatars/avatar${value}.png`}
                            />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                </List>
            </Modal>
        </div>
    )
}

export default Avatara;