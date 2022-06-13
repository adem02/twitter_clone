import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../../services/password';
import { User } from '../../models/user';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

// Signup Route
router.post(
    '/api/auth/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
        body('username')
            .trim()
            .isLength({ min: 3, max: 20 })
            .withMessage('Username is must be between 3 and 20 characters'),
        body('firstname')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('Firstname must be between 4 and 20 characters'),
        body('lastname')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('Lastname must be between 4 and 20 characters'),
        body('birthday')
            .trim()
            .isDate()
            .withMessage('Birthday must be in date format')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, username, firstname, lastname, birthday } = req.body;

        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username })

        if (existingUser) {
            throw new BadRequestError('Email in use, please try another one !');
        }

        if (existingUsername) {
            throw new BadRequestError('Username in use, please try another one !');
        }



        const user = new User({ email, password, username, firstname, lastname, birthday });
        await user.save();

        const formattedUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
        }

        // Generate JWT
        const userJwt = jwt.sign(
            formattedUser,
            process.env.JWT_KEY!
        );


        res.status(201).send({ user: formattedUser, token: userJwt });
    }
);

// Signin Route
router.post(
    '/api/auth/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        const formattedUser = {
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
        }

        // Generate JWT
        const userJwt = jwt.sign(
            formattedUser,
            process.env.JWT_KEY!
        );

        res.status(200).send({
            user: formattedUser,
            token: userJwt
        });
    }
);

export { router as AuthRouter }