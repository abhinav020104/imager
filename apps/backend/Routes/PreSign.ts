import express from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const router = express.Router();
const dotenv = require("dotenv");   
dotenv.config();

const s3Client = new S3Client({
    region: "auto",
    endpoint:process.env.S3_ENDPOINT as string, 
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
});
//@ts-ignore
router.get("/get-url", async (req, res)=> {
    try {
        const bucketName = process.env.S3_BUCKET_NAME; 
        console.log(bucketName);
        //@ts-ignore
        const objectKey = req.query.key as string;
        if (!objectKey) {
            return res.status(400).json({
                success:false,
                message:" >>>> OBJECT KEY IS MISSING >>> "
            })
        }

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); 

        console.log(url);

        res.status(200).json({
            success:true,
            message:">>>>> PRE-SIGNED URL GENERATED SUCCESSFULLY >>>>"
        })

        return; 
    } catch (error:any) {
        console.log(error.message);
        console.log(">>>> FAILED TO GENERATE PRE-SIGNED URL >>>>");
        return res.status(500).json({
            success:false,
            message:" >>>>> FAILED TO GENERATE PRE-SIGNED URL >>>>",
        })
    }
});

export default router;
