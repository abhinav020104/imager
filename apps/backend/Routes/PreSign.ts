import express from "express";
import { S3Client, GetObjectCommand, PutObjectCommand , PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { date } from "zod";
import { Request, Response , Router} from "express";
const router = Router();
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
router.get("/get-url", async (req:Request, res:Response)=> {
    const key = `${Date.now()}_${Math.random()}.zip`;
    try {
        const bucketName = process.env.S3_BUCKET_NAME; 
        
        console.log(" >>>> USING BUCKET : " + bucketName + " <<<< ");

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key, 
        });
        

        const putCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const getURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); 
        const putURL = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });
        
        res.status(200).json({
            success:true,
            message:">>>>> PRE-SIGNED URL GENERATED SUCCESSFULLY >>>>",
            getURL:getURL,
            putURL:putURL,
            key:key,    
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
