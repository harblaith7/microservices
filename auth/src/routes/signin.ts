import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request';
import { validateRequest } from '../middlewares/validate-request';
import { User } from "../models/user"
import { Password } from '../services/password';
import JWT from "jsonwebtoken"

const router = express.Router();

router.post('/api/users/signin', [
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

    const exisitingUser = await User.findOne({
        email
    })

    if(!exisitingUser) {
        throw new BadRequestError("Invalid Credentials")
    };

    const passwordsMatch = await Password.compare(exisitingUser.password, password);

    if(!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials')
    }

    const userJwt = JWT.sign({
        id: exisitingUser.id,
        email: exisitingUser.email
    }, process.env.JWT_KEY!);

    req.session!.jwt = userJwt;

    res.status(201).send(exisitingUser)
})


export { router as signinRouter }