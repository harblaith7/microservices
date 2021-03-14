import express from 'express';
import { json } from 'body-parser'
import 'express-async-errors'

import { signupRouter } from "./routes/signup"
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(signupRouter)

app.all("*", () => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on port 3000!!!!')
})