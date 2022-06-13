import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTweetsRelatedToUser } from "../store/tweet/tweet-actions"
import TweetContainer from "./Tweet/TweetContainer"
import DataIsFetching from "./UI/DataIsFetching"


export default function LikedTweets({ token, id }) {
    const { userTweets, usetTweetsFetched } = useSelector(state => state.tweet)
    const dispatch = useDispatch()



    useEffect(() => {
        if (!usetTweetsFetched) {
            dispatch(getTweetsRelatedToUser(`tweets/related/${id}`, token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTweets])

    return (
        <div>
            <DataIsFetching dataLength={userTweets.length} information="You didn't tweet or like anything !" />
            {userTweets.map((tweet) => (
                <React.Fragment key={tweet.id}>
                    <TweetContainer tweet={tweet} token={token} />
                </React.Fragment>
            ))}
        </div>
    )
}