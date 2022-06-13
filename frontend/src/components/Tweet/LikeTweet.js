import { useDispatch, useSelector } from "react-redux"
import { userHasLikedThisTweet } from "../../services/likeService"
import { likeTweet, unlikeTweet } from "../../store/tweet/tweet-actions"

const LikeTweet = ({ tweet, token }) => {
    const dispatch = useDispatch()
    const { id } = useSelector(state => state.auth.authUser)

    const handleUnlikeTweet = () => {
        dispatch(unlikeTweet(`tweet/${tweet.id}/unlike`, token))
    }

    const handleLikeTweet = () => {
        dispatch(likeTweet(`tweet/${tweet.id}/like`, token))
    }


    return userHasLikedThisTweet(tweet, id) ?
        // If user has already liked the tweet, he can just unlinke
        <span onClick={handleUnlikeTweet} style={{ marginRight: "5px" }}>
            <i className="fas fa-thumbs-up" aria-hidden="true" />
        </span>
        :
        // If user has already liked the tweet, he can just unlinke
        <span onClick={handleLikeTweet} style={{ marginRight: "5px" }}>
            <i className="far fa-thumbs-up" aria-hidden="true" />
        </span>

}

export default LikeTweet