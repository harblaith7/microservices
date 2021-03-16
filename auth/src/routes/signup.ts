import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request';
import { RequestValidationError } from '../errors/request-validation-error';
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
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({
        email
    });

    if(existingUser) {
        throw new BadRequestError('Email in use')
    }

    const user = User.build({
        email,
        password
    })

    await user.save();

    const userJwt = JWT.sign({
        id: user.id,
        email: user.email
    }, "ghuiweghiu3gh32g32");

    req.session!.jwt = userJwt;

    res.status(201).send(user)

});

export { router as signupRouter }
