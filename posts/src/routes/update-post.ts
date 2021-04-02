import { BadRequestError, CustomError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from "@shopigram/common";
import express, { Request, Response } from "express";
import { Post } from "../models/post";
import { body } from "express-validator"

const router = express.Router();

router.put(
    '/api/posts/:id', 
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
    let {title, body} = req.body;
    let postId = req.params.id

    let post = await Post.findById(postId);

    if(!post) {
        throw new NotFoundError()
    }

    if(post.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    post.set({
        title,
        body
    })

    post.save()

    res.send(post)
});

export { router as updatePostRouter }