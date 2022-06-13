import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../../styles/home.css"
import "../../styles/primary.css"
import { useDispatch, useSelector } from 'react-redux'
import TweetContainer from "./TweetContainer"
import { getTweet } from "../../store/tweet/tweet-actions"
import DataIsFetching from "../UI/DataIsFetching"

function SingleTweet() {
    const navigate = useNavigate()
    const { tweetId } = useParams()
    const { token } = useSelector(state => state.auth)
    const { tweet } = useSelector(state => state.tweet)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTweet(`tweet/${tweetId}`, token))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweetId])


    return (<React.Fragment>
        <div className="home">
            <div className="home-header">
                <span className="back-arrow" onClick={() => navigate(-1)}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </span>
                <h3 className="home-title">Tweet</h3>
            </div>

            {tweet ?
                <React.Fragment>
                    <TweetContainer tweet={tweet} token={token} />
                    <div className="responses"><p>Comments</p></div>
                    <DataIsFetching dataLength={tweet.tweets.length} information="No comments for this tweet yet !" />
                    {tweet.tweets && tweet.tweets.map((tweet) => (
                        <React.Fragment key={tweet.id}>
                            <TweetContainer tweet={tweet} token={token} />
                        </React.Fragment>
                    ))}
                </React.Fragment>
                : <DataIsFetching />
            }
        </div>
    </React.Fragment>
    )
}

export default SingleTweet