import React from "react"
import { useDispatch } from 'react-redux'
import { followUser } from "../../store/user/user-actions"

export default function FollowUser({ id, token }) {
    const dispatch = useDispatch()

    const handleFollow = () => {
        dispatch(followUser(`users/${id}/follow`, token))
    }

    return (
        <div>
            <button onClick={handleFollow} className="edit-button follow">
                Follow
            </button>
        </div>
    )
}