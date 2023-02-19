import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Avatara from "../avatar/Avatar";
import UserActivity from "../useractivity/UserActivity";

function User(){
    const {userId} = useParams();
    const [user, setUser] = useState();

    const getUser = () => {
        fetch("/users/"+userId, {
          headers: {
            "Authorization": localStorage.getItem("tokenKey")
          }, 
        })
        .then(res => res.json())
        .then(
          (result) => {
            setUser(result);
          },
          (error) => {
            console.log(error)
          }
        )
    }

    useEffect(() => {
        getUser();
    }, [])
    
    return(
        <div style={{ display:"flex" }}>
            {user? <Avatara avatarId={user.avatarId} userId={userId} userName={user.username}/> : "" }
            {localStorage.getItem("currentUser") === userId ? <UserActivity userId={userId}/> : ""}
        </div>
    )
}

export default User;