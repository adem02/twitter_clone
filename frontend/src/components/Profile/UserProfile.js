import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserProfile } from '../../store/user/user-actions'
import LikedTweets from '../LikedTweets'
import FollowUser from './FollowUser'
import UnfollowUser from './UnfollowUser'

const UserProfile = ({ token, authUserId }) => {

    const { user } = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { username } = useParams()

    useEffect(() => {
        if (!user) {
            dispatch(getUserProfile(`users/${username}`, token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        user &&
        <React.Fragment>
            <div className="profile-info">
                <div className="profile-head">
                    <span className="back-arrow" onClick={() => navigate(-1)}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </span>
                    <span className="nickname">
                        <h4>{user.username}</h4>
                    </span>
                </div>
                <div className="avatar">
                    <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                </div>
                <div className="make_profile">
                    {user.followers.includes(authUserId) ?
                        <UnfollowUser id={user.id} token={token} /> :
                        <FollowUser id={user.id} token={token} />
                    }
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

export default UserProfile