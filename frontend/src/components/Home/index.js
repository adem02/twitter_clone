import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import LeftNav from "./LeftNav"
import "../../styles/home.css"
import "../../styles/primary.css"
import { Outlet } from "react-router-dom"
import PopularTweets from "./PopularTweets"
import { getLoggedUserProfile } from "../../store/auth/auth-actions"


const Home = () => {
    const { authUser, token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoggedUserProfile(token))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <React.Fragment>
            {authUser &&
                <div className="primary">
                    <div className="left">
                        <LeftNav user={authUser} />
                    </div>
                    <Outlet context={{ authUser, token }} />
                    <div className="right">
                        <PopularTweets />
                    </div>
                </div>}
        </React.Fragment>
    )
}

export default Home