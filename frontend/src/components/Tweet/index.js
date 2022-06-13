import React from 'react'
import { useOutletContext } from 'react-router-dom'
import AllTweets from './AllTweets'
import HomeTweet from './HomeTweet'

const Tweet = () => {

    const { token } = useOutletContext()

    return (
        <div className="home">
            <div className="home-header">
                <h3 className="home-title">Home</h3>
            </div>
            <HomeTweet token={token} />
            <AllTweets token={token} />
        </div>
    )
}

export default Tweet