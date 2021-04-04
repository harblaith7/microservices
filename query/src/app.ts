import express from 'express';
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from "cookie-session"
import { errorHandler, NotFoundError, currentUser } from '@shopigram/common';
import { getPostsRouter } from './routes/get-posts';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
    cookieSession({
        name: 'session',
        keys: ['jwt'],
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)
app.use(currentUser)
app.use(getPostsRouter)

app.all("*", () => {
    throw new NotFoundError()
})

app.use(errorHandler);

export {
    app
}