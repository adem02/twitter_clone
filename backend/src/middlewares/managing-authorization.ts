import { Like } from './../models/Like';
import { Tweet } from './../models/tweet';
import { Profile } from './../models/profile';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotFoundError } from '../errors/not-found-error';

export const requireProfileManagement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const profile = await Profile.findById(req.params?.id)
    if (!profile) {
        throw new NotFoundError()
    }

    else if (req.currentUser?.id !== profile?.user.toString()) {
        throw new NotAuthorizedError();
    }

    next();
};

export const requireTweetManagement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const tweet = await Tweet.findById(req.params?.id)

    if (!tweet) {
        throw new NotFoundError()
    }

    else if (req.currentUser?.id !== tweet?.author.toString()) {
        throw new NotAuthorizedError();
    }

    next();
};

export const requireLikeManagement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const like = await Like.findOne({ tweet: req.params?.id, user: req.currentUser?.id })

    if (!like) {
        throw new NotFoundError()
    }

    else if (req.currentUser?.id !== like?.user.toString()) {
        throw new NotAuthorizedError();
    }

    next();
};
