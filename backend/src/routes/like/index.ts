import { requireLikeManagement } from './../../middlewares/managing-authorization';
import { Like } from './../../models/Like';
import express, { Request, Response } from 'express'
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { Tweet } from '../../models/tweet';

const router = express.Router()

router.post(
    '/api/tweet/:id/like',
    requireAuth,
    async (req: Request, res: Response) => {

        const tweet = await Tweet.findById(req.params?.id)


        if (!tweet) {
            throw new NotFoundError()
        }

        const like = new Like({
            tweet: req.params?.id,
            user: req.currentUser?.id
        })

        tweet.likes.push(like?.user)
        await tweet.save()

        await like.save()

        res.status(201).send({ like });
    }
)

router.delete(
    '/api/tweet/:id/unlike',
    requireAuth,
    requireLikeManagement,
    async (req: Request, res: Response) => {

        const like = await Like.findOneAndRemove({ tweet: req.params?.id, user: req.currentUser?.id })

        if (!like) {
            throw new NotFoundError()
        }

        const tweet = await Tweet.findById(like.tweet)


        if (!tweet) {
            throw new NotFoundError()
        }

        tweet.likes = tweet.likes.filter(like => like.toString() !== tweet.author.toString())

        tweet.save()

        res.send({ like })
    }
)


export { router as LikeRouter }