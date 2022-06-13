import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllTweets } from "../../store/tweet/tweet-actions"
import "../../styles/allTweets.css"
import DataIsFetching from "../UI/DataIsFetching"
import TweetContainer from "./TweetContainer"

export default function AllTweets({ token }) {
    const { tweets, tweetsFetched } = useSelector(state => state.tweet)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!tweetsFetched) {
            dispatch(getAllTweets('tweets', token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweets])



    return (
        <div>
            <DataIsFetching dataLength={tweets.length} information="You will se people tweets here !" />
            {tweets.map((tweet) => (
                <React.Fragment key={tweet.id}>
                    <TweetContainer tweet={tweet} token={token} />
                </React.Fragment>
            ))}
        </div>
    )
}