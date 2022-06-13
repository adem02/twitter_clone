import { Profile } from '../../models/profile';
import express, { Request, Response } from 'express'
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { requireProfileManagement } from '../../middlewares/managing-authorization';

const router = express.Router()

router.post(
    '/api/profile',
    requireAuth,
    async (req: Request, res: Response) => {
        const { location, bio } = req.body;

        const profile = new Profile({
            location,
            bio,
            user: req.currentUser?.id
        })

        const user = await User.findById(req.currentUser?.id)
        if (!user) {
            throw new NotFoundError()
        }
        user.profile = profile.id;

        await user.save()
        await profile.save()

        res.status(201).send({ profile })
    }
)

router.put(
    '/api/profile/:id',
    requireAuth,
    requireProfileManagement,
    async (req: Request, res: Response) => {
        const profile = await Profile.findByIdAndUpdate(req.params?.id, req.body, { new: true, useFindAndModify: false })
        if (!profile) {
            throw new NotFoundError();
        }

        res.status(201).send({ profile });
    }
)

export { router as ProfileRouter }