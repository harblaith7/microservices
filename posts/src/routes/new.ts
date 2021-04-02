import { requireAuth, validateRequest } from "@shopigram/common";
import express, { Request, Response } from "express";
import { body } from "express-validator"

const router = express.Router();

router.post(
    '/api/posts', 
    requireAuth, 
    [
        body('title')
          .not()
          .isEmpty()
          .withMessage('Title is required'),
        body('post')
            .isLength({
                min: 20
            })
            .withMessage('Post must be greater than 20 characters'),
    ],
    validateRequest,
    (req: Request, res: Response) => {

    res.json({
        "safasfas": "sfsafff"
    });
});

export { router as createImageRouter }