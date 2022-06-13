import axios from 'axios'
import { AuthActions } from '../auth/auth-slice'
import { UserActions } from './user-slice'

export const getUserProfile = (uri, token) => {
    return async (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                const { user } = res.data
                dispatch(UserActions.getUser({ user }))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const followUser = (uri, token) => {
    return async (dispatch) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, {}, { headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data) {
            const { followData } = res.data
            await dispatch(UserActions.followUser({ followData }));
            await dispatch(AuthActions.followUser({ followData }))
        }

        else {
            if (res.response) {
                alert(res.response.data.errors[0])
            }
        }
    }
}

export const unfollowUser = (uri, token) => {
    return async (dispatch) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, {}, { headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data) {
            const { unfollowData } = res.data
            await dispatch(UserActions.unfollowUser({ unfollowData }));
            await dispatch(AuthActions.unfollowUser({ unfollowData }))
        }

        else {
            if (res.response) {
                alert(res.response.data.errors[0])
            }
        }
    }
}