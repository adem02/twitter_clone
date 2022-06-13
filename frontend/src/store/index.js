import { configureStore } from '@reduxjs/toolkit'
import AuthSliceReducer from './auth/auth-slice'
import tweetSliceReducer from './tweet/tweet-slice'
import userSliceReducer from './user/user-slice'
import UiSliceReducer from './ui/ui-slice'

export default configureStore({
    reducer: { auth: AuthSliceReducer, tweet: tweetSliceReducer, user: userSliceReducer, ui: UiSliceReducer }
})