import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { Types } from 'mongoose';
import { NotFoundError } from '../../errors/not-found-error';
import { requireTweetManagement } from '../../middlewares/managing-authorization';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Like } from '../../models/Like';
import { Tweet } from '../../models/tweet';

const router = express.Router()

router.post(
    '/api/tweet',
    [
        body('content')
            .trim()
            .isLength({ min: 1, max: 256 })
            .withMessage('Un tweet doit avoir au maximum 256 charactères')
    ],
    validateRequest,
    requireAuth,
    async (req: Request, res: Response) => {
        const { content, responseTo } = req.body;

        const tweet = new Tweet({
            content,
            author: req.currentUser?.id,
            responseTo
        })

        if (responseTo) {
            const respondedTweet = await Tweet.findById(responseTo)
            respondedTweet!.tweets.push(tweet.id)
            respondedTweet!.save()
        }

        await tweet.save()

        let tweetPayload: any = {}

        await tweet.populate('author').execPopulate().then(res => {
            tweetPayload = JSON.parse(JSON.stringify(res));
        })



        res.status(201).send({ tweetPayload })
    }
)


router.get('/api/tweets',
    requireAuth,
    async (req: Request, res: Response) => {
        const tweets = await Tweet.find({ responseTo: null || undefined })
            .populate('author')
            .sort({ createdAt: -1 })
            .exec()

        if (!tweets) {
            throw new NotFoundError();
        }

        res.status(200).send({ tweets })
    })


// Get a tweet by id
router.get('/api/tweet/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const tweet = await Tweet.findById(req.params?.id)
            .populate('author')
            .populate({
                path: 'tweets',
                populate: { path: 'author' }
            })
            .populate({
                path: 'tweets',
                populate: {
                    path: 'tweets', populate: {
                        path: 'author'
                    }
                }
            })
            .exec()

        if (!tweet) {
            throw new NotFoundError();
        }

        res.status(200).send({ tweet })
    })

// Get tweets related to a User
router.get('/api/tweets/related/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let likes = await Like.find({ user: req.params?.id })
        likes = likes.map(like => like.id)


        const tweets = await Tweet.find(
            {
                $or: [
                    { author: Types.ObjectId(req.params?.id) },
                    { likes: { $elemMatch: { $in: likes } } }
                ]
            },
        )
            .populate('author')
            .sort({ createdAt: -1 })
            .exec()

        res.status(201).send({ tweets })

    })

router.delete(
    '/api/tweet/:id',
    requireAuth,
    requireTweetManagement,
    async (req: Request, res: Response) => {

        const tweet = await Tweet.findByIdAndRemove(req.params?.id)

        if (!tweet) {
            throw new NotFoundError()
        }

        const commentedTweet = await Tweet.findById(tweet.responseTo)

        if (commentedTweet) {
            commentedTweet.tweets = commentedTweet.tweets.filter(id => id.toString() !== tweet.id)
            commentedTweet.save()
        }

        res.send({ id: tweet.id, responseTo: tweet.responseTo })
    }
)

export { router as TweetRouter }