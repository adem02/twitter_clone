import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    user: null,
    changed: false
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initialValues,
    reducers: {
        getUser(state, action) {
            state.user = action.payload.user
        },
        followUser(state, action) {
            const followPayload = action.payload.followData;
            if (state.user.followers) {
                state.user.followers = [...state.user.followers, followPayload.follower]
            }
        },
        unfollowUser(state, action) {
            const { unfollower } = action.payload.unfollowData;
            if (state.user.followers) {
                state.user.followers = state.user.followers.filter(unfollow => unfollow !== unfollower)
            }
        }
    }
})

export const UserActions = UserSlice.actions;
export default UserSlice.reducer