import express, { Request, Response } from 'express';

import { User } from '../../models/user';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found-error';


const router = express.Router();

// Get me (signed User) infos : Returns the currentUser data POPULATED with (profile)
router.get('/api/users/meProfile', requireAuth, async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser?.id)
        .populate('profile')
        .exec()

    res.status(200).send({ user });
});

// Get user infos by username: Returns the the wanted user data POPULATED with (profile)
router.get('/api/users/:username', requireAuth, async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
        .populate('profile')
        .exec()

    if (!user) {
        throw new NotFoundError()
    }

    res.status(200).send({ user });
})

router.post(
    '/api/users/:id/follow',
    requireAuth,
    async (req: Request, res: Response) => {

        const userToFollow = await User.findById(req.params?.id)
        const user = await User.findById(req.currentUser?.id)

        if (!userToFollow || !user) {
            throw new NotFoundError()
        }

        user.followings.push(userToFollow.id)
        userToFollow.followers.push(user.id)

        user.save()
        userToFollow.save()

        const followData = {
            follower: user.id,
            following: userToFollow.id
        }

        res.status(201).send({ followData });
    }
)

router.post(
    '/api/users/:id/unfollow',
    requireAuth,
    async (req: Request, res: Response) => {

        const userToUnfollow = await User.findById(req.params?.id)
        const user = await User.findById(req.currentUser?.id)


        if (!userToUnfollow || !user) {
            throw new NotFoundError()
        }

        user.followings = user.followings.filter(unfollowed => unfollowed.toString() !== userToUnfollow.id)
        userToUnfollow.followers = userToUnfollow.followers.filter(unfollowing => unfollowing.toString() !== user.id)

        user.save()
        userToUnfollow.save()

        const unfollowData = {
            unfollower: user.id,
            unfollowing: userToUnfollow.id
        }

        res.status(201).send({ unfollowData });
    }
)

export { router as UserRouter }