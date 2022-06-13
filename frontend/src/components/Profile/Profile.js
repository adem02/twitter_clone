import React from "react"
import { useOutletContext, useParams } from "react-router-dom"
import "../../styles/primary.css"
import "../../styles/profile.css"
import MyProfile from "./MyProfile"
import UserProfile from "./UserProfile"

const Profile = () => {
    const { username } = useParams()
    const { authUser, token } = useOutletContext()

    return (
        <React.Fragment>
            <div className="profile">
                {username === authUser.username ?
                    <MyProfile user={authUser} token={token} /> :
                    <UserProfile token={token} authUserId={authUser.id} />
                }
            </div>
        </React.Fragment>
    )
}

export default Profile