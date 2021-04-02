import { requireAuth } from "@shopigram/common";
import express, { Request, Response } from "express";
import AWS from "aws-sdk"
import { accessKeyId, secretAccessKey } from "../keys"
import { v1 as uuid } from "uuid"
import multer from "multer";
import multerS3 from "multer-s3"

const router = express.Router();

router.post('/api/posts/upload', requireAuth, async (req, res) => {
    res.send("working")
});

export { router as uploadImageRouter }