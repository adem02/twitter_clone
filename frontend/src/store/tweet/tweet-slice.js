import { createSlice } from "@reduxjs/toolkit";

const fillTweetComments = (tweets, payload) => {
    tweets[tweets?.map(tweet => tweet?.id).indexOf(payload.responseTo)]
        ?.tweets.push(payload.id);
}

const removeTweetComments = (tweets, payload) => {
    const index = tweets.findIndex(tweet => tweet.id === payload.responseTo)

    index !== -1 &&
        (tweets[index].tweets = tweets[index].tweets.filter(tweetId => tweetId !== payload.id))
}

const initialValues = {
    tweets: [],
    tweetsFetched: false,
    usetTweetsFetched: false,
    userTweets: [],
    tweet: null
}

const TweetSlice = createSlice({
    name: "tweet",
    initialState: initialValues,
    reducers: {
        createTweet(state, action) {
            const { responseTo, id } = action.payload.tweetPayload

            if (!responseTo) {
                state.tweets.unshift(action.payload.tweetPayload)
            }
            state.tweets && (fillTweetComments(state.tweets, { responseTo, id }))

            state.userTweets.unshift(action.payload.tweetPayload)
            state.userTweets && fillTweetComments(state.userTweets, { responseTo, id })

            if (state.tweet?.id === responseTo) {
                state.tweet.tweets.unshift(action.payload.tweetPayload)
            }
            state.tweet?.tweets && fillTweetComments(state.tweet.tweets, { responseTo, id })

        },
        getTweets(state, action) {
            state.tweets = action.payload.tweets
            state.tweetsFetched = true
        },
        getRelatedTweets(state, action) {
            state.userTweets = action.payload.tweets
            state.usetTweetsFetched = true
        },
        getSingleTweet(state, action) {
            state.tweet = action.payload.tweet
        },
        deleteTweet(state, action) {
            const { id, responseTo } = action.payload
            if (!responseTo) {
                state.tweets = state.tweets.filter(tweet => tweet.id !== id)
            }
            state.userTweets = state.userTweets.filter(tweet => tweet.id !== id)

            if (responseTo) {
                removeTweetComments(state.userTweets, { id, responseTo })
                removeTweetComments(state.tweets, { id, responseTo })
            }

            if (state.tweet?.tweets) {
                state.tweet.tweets = state.tweet?.tweets.filter(tweet => tweet.id !== action.payload.id)
            }

        },
        likeTweet(state, action) {
            const likePayload = action.payload.like
            const tweetsI = state.tweets.findIndex((tweet) => tweet.id === likePayload.tweet)
            const uTweetsI = state.userTweets.findIndex((tweet) => tweet.id === likePayload.tweet)
            tweetsI !== -1 &&
                state.tweets[tweetsI].likes.push(likePayload.user)
            uTweetsI !== -1 &&
                state.userTweets[uTweetsI].likes.push(likePayload.user)

            if (state.tweet) {
                if (likePayload.tweet === state.tweet.id)
                    state.tweet.likes.push(likePayload.user)
                else if (state.tweet.tweets) {
                    const singleTweetsId = state.tweet.tweets.findIndex((tweet) => tweet.id === likePayload.tweet)
                    singleTweetsId !== -1 &&
                        state.tweet.tweets[singleTweetsId].likes.push(likePayload.user)
                }
            }
        },
        unlikeTweet(state, action) {
            const likePayload = action.payload.like
            const tweetsI = state.tweets.findIndex((tweet) => tweet.id === likePayload.tweet)
            const uTweetsI = state.userTweets.findIndex((tweet) => tweet.id === likePayload.tweet)
            tweetsI !== -1 &&
                (state.tweets[tweetsI].likes = state.tweets[tweetsI].likes.filter(like => like !== likePayload.user))
            uTweetsI !== -1 &&
                (state.userTweets[uTweetsI].likes = state.userTweets[uTweetsI].likes.filter(like => like !== likePayload.user))

            if (state.tweet) {
                if (likePayload.tweet === state.tweet.id)
                    (state.tweet.likes = state.tweet.likes.filter(like => like !== likePayload.user))
                else if (state.tweet && state.tweet.tweets.length > 0) {
                    const singleTweetsId = state.tweet.tweets.findIndex((tweet) => tweet.id === likePayload.tweet)
                    singleTweetsId !== -1 &&
                        (state.tweet.tweets[singleTweetsId].likes = state.tweet.tweets[singleTweetsId].likes.filter(like => like !== likePayload.user))
                }
            }
        }
    }
})

export const TweetActions = TweetSlice.actions;
export default TweetSlice.reducer