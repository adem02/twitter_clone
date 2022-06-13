import React from "react"
import { useDispatch } from 'react-redux'
import { unfollowUser } from "../../store/user/user-actions"
// import { unfollowUser } from "../../store/auth/auth-actions"

const UnfollowUser = ({ id, token }) => {
    const dispatch = useDispatch()

    const handleUnfollow = () => {
        dispatch(unfollowUser(`users/${id}/unfollow`, token))
    }

    return (
        <div>
            <button onClick={handleUnfollow} className="unfollow">
                Unfollow
            </button>
        </div>
    )
}

export default UnfollowUser