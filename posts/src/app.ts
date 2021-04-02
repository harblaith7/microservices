import express from 'express';
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from "cookie-session"
import { errorHandler, NotFoundError, currentUser } from '@shopigram/common';
import { createImageRouter } from './routes/new';
import { uploadImageRouter } from './routes/upload';


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
app.use(createImageRouter)
app.use(uploadImageRouter)

app.all("*", () => {
    throw new NotFoundError()
})

app.use(errorHandler);

export {
    app
}