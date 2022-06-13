import axios from 'axios'
import { AuthActions } from './auth-slice'

export const signUser = (uri, data) => {
    return async (dispatch) => {

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, data)
            const { token, user } = res.data
            dispatch(AuthActions.signUser({ token, user }))
        } catch (err) {
            const errors = err.response.data.errors
            dispatch(AuthActions.errors({ errors }))
        }
    }
}

export const getLoggedUserProfile = (token) => {
    return async (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URI_DEV}/users/meProfile`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                const { user } = res.data
                dispatch(AuthActions.getMe({ user }))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const createProfile = (uri, data) => {
    return async (dispatch) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        if (res.data) {
            const { profile } = res.data
            dispatch(AuthActions.cruProfile({ profile }))
        }

        else {
            if (res.response) {
                alert(res.response.data.errors[0])
            }
        }
    }
}

export const updateProfile = (uri, data) => {
    return async (dispatch) => {
        const res = await axios.put(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })

        if (res.data) {
            const { profile } = res.data
            dispatch(AuthActions.cruProfile({ profile }));
        }

        else {
            if (res.response) {
                alert(res.response.data.errors[0])
            }
        }
    }
}



