import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    userIsLogged: !!localStorage.getItem('token') || false,
    token: localStorage.getItem('token') || "",
    authUser: null,
    userUpdated: false,
    errors: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialValues,
    reducers: {
        signUser(state, action) {
            state.token = action.payload.token
            state.userIsLogged = true
            state.authUser = action.payload.user
            localStorage.setItem('token', action.payload.token)
            state.errors = null
        },
        logoutUser(state) {
            state.userIsLogged = false
            state.token = ""
            localStorage.removeItem('token')
        },
        getMe(state, action) {
            state.authUser = action.payload.user
        },
        cruProfile(state, action) {
            const profilePayload = action.payload.profile
            state.authUser = { ...state.authUser, profile: { ...profilePayload } }
        },
        followUser(state, action) {
            const followPayload = action.payload.followData;
            if (state.authUser.followings) {
                state.authUser.followings = [...state.authUser.followings, followPayload.following]
            }
        },
        unfollowUser(state, action) {
            const { unfollowing } = action.payload.unfollowData;
            if (state.authUser.followings) {
                state.authUser.followings = state.authUser.followings.filter(unfollow => unfollow !== unfollowing)
            }
        },
        errors(state, action) {
            state.errors = action.payload.errors
        }
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer