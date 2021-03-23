import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request';
import { validateRequest } from "../middlewares/validate-request"
import { User } from "../models/user"
import JWT from "jsonwebtoken"

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({
            min: 4,
            max: 20
        })
        .withMessage('Password must be between 4 & 20 characters')
], 
validateRequest, 
async (req: Request, res: Response) => {

    console.log("logger")

    const { email, password } = req.body;

    const existingUser = await User.findOne({
        email
    });
    

    if(existingUser) {
        throw new BadRequestError('Email in use')
    }

    console.log("logger 2")

    const user = User.build({
        email,
        password
    })

    await user.save();

    console.log("logger 3", process.env.JWT_KEY)

    const userJwt = JWT.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    console.log("logger 4")

    req.session!.jwt = userJwt;

    res.status(201).send(user)

});

export { router as signupRouter }
