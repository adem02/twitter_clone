import { formatDistance, subDays } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import ReplyTweet from '../Comment/ReplyTweet'
import LikeTweet from './LikeTweet'
import { useSelector } from 'react-redux'
import '../../styles/tweet-container.css'
import ManageTweet from './ManageTweet'

const TweetContainer = ({ tweet, token }) => {
    const { authUser } = useSelector(state => state.auth)

    return (
        <div key={tweet.id} className="tweet-container">
            <div>
                {tweet.responseTo && <div className="responseTo">response</div>}
                <div className="tweet-header">
                    <span className="avatar">
                        <i className="fa fa-user fa-5x" aria-hidden="true" style={{ fontSize: "20px", borderRadius: "50%" }}></i>
                    </span>
                    <Link to={`/home/${tweet.author.username}`}>
                        <h4 className="name">{tweet.author.username} </h4>
                    </Link>
                    <p className="date-time">
                        {formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago
                    </p>
                    {authUser.id === tweet.author.id ?
                        <ManageTweet id={tweet.id} token={token} />
                        :
                        null
                    }
                </div>
                <Link to={`../status/${tweet.id}`}>
                    <p className="content">{tweet.content}</p>
                </Link>
            </div>
            <div className="likes">
                <span>
                    <LikeTweet tweet={tweet} token={token} />
                    {tweet.likes.length}
                </span>
                <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <ReplyTweet
                        username={tweet.author.username}
                        tweet={tweet.content}
                        id={tweet.id}
                        token={token}
                    />
                    {tweet.tweets.length || null}
                </span>
            </div>
        </div>
    )
}

export default TweetContainer