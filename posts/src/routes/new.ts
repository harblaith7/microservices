import { requireAuth, validateRequest } from "@shopigram/common";
import express, { Request, Response } from "express";
import { body } from "express-validator"
import { Post } from "../models/post";

const router = express.Router();

router.post(
    '/api/posts', 
    requireAuth, 
    [
        body('title')
          .not()
          .isEmpty()
          .withMessage('Title is required'),
        body('body')
            .isLength({
                min: 20
            })
            .withMessage('Post must be greater than 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {title, body} = req.body;

        const post = Post.build({
            title,
            body,
            userId: req.currentUser!.id
        });

        await post.save()

        res.status(201).send(post)
});

export { router as createImageRouter }