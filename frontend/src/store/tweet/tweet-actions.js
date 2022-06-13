import { TweetActions } from "./tweet-slice";
import { uiActions } from '../ui/ui-slice'
import axios from 'axios'

export const createTweet = (uri, data) => {

    return async (dispatch) => {
        const { content, token, responseTo } = data
        axios.post(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { content, responseTo }, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                const { tweetPayload } = res.data
                dispatch(TweetActions.createTweet({ tweetPayload }))
            })
            .catch(err => {
                console.log("Something went wrong !!!!");
            })
    }
}

export const getAllTweets = (uri, token) => {
    return async (dispatch) => {
        dispatch(uiActions.dataPending({ pending: true }))
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { headers: { 'Authorization': `Bearer ${token}` } })
            const { tweets } = data
            dispatch(TweetActions.getTweets({ tweets }))

            dispatch(uiActions.dataPending({ pending: false }))
        } catch (err) {
            console.log("Something went wrong !!!!");
        }
    }
}

export const getTweetsRelatedToUser = (uri, token) => {
    return async (dispatch) => {
        dispatch(uiActions.dataPending({ pending: true }))
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { headers: { 'Authorization': `Bearer ${token}` } })
            const { tweets } = data
            dispatch(TweetActions.getRelatedTweets({ tweets }))

            dispatch(uiActions.dataPending({ pending: false }))
        } catch (err) {
            console.log("Something went wrong !!!!");
        }
    }
}

export const getTweet = (uri, token) => {
    return async (dispatch) => {
        dispatch(uiActions.dataPending({ pending: true }))
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { headers: { 'Authorization': `Bearer ${token}` } })
            const { tweet } = data
            dispatch(TweetActions.getSingleTweet({ tweet }))

            dispatch(uiActions.dataPending({ pending: false }))
        } catch (err) {
            console.log('Something went wrong');
        }


    }
}

export const likeTweet = (uri, token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, {}, { headers: { 'Authorization': `Bearer ${token}` } })
            const { like } = data
            dispatch(TweetActions.likeTweet({ like }))
        } catch (err) {
            console.log("Something went wrong !!!!");

        }
    }
}

export const unlikeTweet = (uri, token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { headers: { 'Authorization': `Bearer ${token}` } })
            const { like } = data
            dispatch(TweetActions.unlikeTweet({ like }))
        } catch (err) {
            console.log("Something went wrong !!!!");
        }

    }
}

export const deleteTweet = (uri, data) => {
    const { token } = data
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URI_DEV}/${uri}`, { headers: { 'Authorization': `Bearer ${token}` } })
            const { id, responseTo } = data
            dispatch(TweetActions.deleteTweet({ id, responseTo }))
        } catch (err) {
            console.log(err);
        }
    }
}