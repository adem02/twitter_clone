import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import favicon from "../../assets/Images/Twitter-logo.svg.png"
import "../../styles/leftNav.css"
import Logout from "../Auth/Logout"
import CreateTweet from "../Tweet/CreateTweet"

const LeftNav = () => {
    const { authUser } = useSelector(state => state.auth)

    return (
        <div className="leftNav">
            <Link to="">
                <img src={favicon} alt="logo" style={{ width: "30px", marginTop: "10px" }} />
            </Link>
            <Link to="">
                <h2>
                    <i className="fa fa-home" aria-hidden="true" /> <span className="title">Home</span>
                </h2>
            </Link>
            <Link to={authUser !== null && authUser.username}>
                <h2>
                    <i className="fa fa-user" aria-hidden="true" /> <span className="title">Profile</span>
                </h2>
            </Link>
            <Link to="/users">
                <h2>
                    <i className="fa fa-envelope" aria-hidden="true" /> <span className="title">Messages</span>
                </h2>
            </Link>
            <Link to="/users">
                <h2>
                    <i className="fa fa-bell" aria-hidden="true" /> <span className="title">Notifications</span>
                </h2>
            </Link>
            <CreateTweet />
            <Logout />
        </div>
    )
}

export default LeftNav