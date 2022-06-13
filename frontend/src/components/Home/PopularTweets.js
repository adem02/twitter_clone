import { format } from "date-fns"
import React from "react"
import { useParams } from "react-router-dom"
import "../../styles/popularTweets.css"

export default function PopularTweets({ tweets = [] }) {
    const id = useParams()

    const getPopularTweets = tweets
        .map((tweet) => tweet)
        .sort(function (a, b) {
            return b.likes.length - a.likes.length
        })
        .slice(0, 5)

    return (
        <div className="popular-tweets">
            <h3 className="trending">Trending</h3>
            <p>Get popular tweets</p>
            {/* {getPopularTweets.map((tweet) => (
                <div className="popular-tweet-container" key={tweet.id}>
                    <div className="date-title">
                        <div className="title-logo">
                            <span className="avatar">
                                <i className="fa fa-user fa-5x" aria-hidden="true" style={{ fontSize: "20px", borderRadius: "50%" }}></i>
                            </span>
                            <p className="tweet-content">{tweet.content}</p>
                        </div>
                        <p className="date">{format(new Date(tweet.createdAt), "MM/dd/yy")}</p>
                    </div>
                    <div className="tweet-likes">
                        {tweet.likes.length > 0 ? <span>Likes {tweet.likes.length}</span> : null}
                    </div>
                </div>
            ))} */}
        </div>
    )
}