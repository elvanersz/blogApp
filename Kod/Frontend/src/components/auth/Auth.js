import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";

function Auth(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (value) => {
        setUsername(value)
    }
    const handlePassword = (value) => {
        setPassword(value)
    } 

    const sendRequest = (path) => {
        fetch("/auth/"+path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((res) => res.json())
        .then((result) => {localStorage.setItem("tokenKey",result.message);
                        localStorage.setItem("currentUser",result.userId);
                        localStorage.setItem("username",username)})
        .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        window.location.reload(true)
    } 


    return(
        <div>
            <FormControl style={{ marginTop:100 }}>
                <InputLabel>Username</InputLabel>
                <Input onChange={(i) => handleUsername(i.target.value)}></Input>
                <InputLabel style={{ top:80 }}>Passsword</InputLabel>
                <Input style={{ top:30 }}
                    onChange={(i) => handlePassword(i.target.value)}></Input>
                <Button variant="cortained"
                    style={{ marginTop:60,
                    background:"linear-gradient(45deg, #2196F3 25%, #21CBF3 90%",
                    color:"white" }}
                    onClick={() => handleButton("register")}>
                    REGISTER</Button>
                <FormHelperText style={{ marginTop:10 }}>Are you already registered?</FormHelperText>       
                <Button variant="cortained"
                    style={{ marginTop:10,
                    background:"linear-gradient(45deg, #2196F3 25%, #21CBF3 90%",
                    color:"white" }}
                    onClick={() => handleButton("login")}>
                    LOGIN</Button>
            </FormControl>
        </div>
    )
}

export default Auth;