import { currentUser } from './../middlewares/current-user';
import express, { Request, Response } from 'express'
import { AuthRouter } from './auth'
import { LikeRouter } from './like'
import { ProfileRouter } from './profile'
import { TweetRouter } from './tweet'
import { UserRouter } from './user'

const app = express()


app.use(currentUser);

app.use(AuthRouter)
app.use(UserRouter)
app.use(LikeRouter)
app.use(ProfileRouter)
app.use(TweetRouter)

export { app as Routes }