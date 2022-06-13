import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UpdateProfile from './UpdateProfile'
import CreateProfile from './CreateProfile'
import LikedTweets from '../LikedTweets'

const MyProfile = ({ user, token }) => {
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <div className="profile-info">
                <div className="profile-head">
                    <span className="back-arrow" onClick={() => navigate(-1)}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </span>
                    <div className="nickname">
                        <h4>{user.username}</h4>
                    </div>
                </div>
                <div className="avatar">
                    <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                </div>
                <div className="make_profile">
                    {user.profile ?
                        <UpdateProfile profile={user.profile} /> : <CreateProfile />}
                </div>

                <h3 className="name">{(user.firstname)}</h3>

                {user.profile && user.profile.bio ? (
                    <p>
                        <i className="fas fa-link"> </i>{" "}
                        <Link
                            to={{ pathname: `http://google.com` }}
                            target="_blank"
                        >
                            {user.profile.bio}
                        </Link>
                    </p>
                ) : null}
                <div className="followers">
                    <p>{user.followings.length} Abonnements</p>
                    <p>{user.followers.length} Abonnés</p>
                </div>
            </div>
            <LikedTweets token={token} id={user.id} />
        </React.Fragment>
    )
}

export default MyProfile