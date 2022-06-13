export const userHasLikedThisTweet = (tweet, userId) => {
    return tweet.likes.includes(userId)
}