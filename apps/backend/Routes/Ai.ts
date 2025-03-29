import express from  "express"
const router = express.Router();
import {PrismaClient} from "@prisma/client"
import {GenerateImage, TrainModel} from "../types"
const prismaClient = new PrismaClient();  
const USER_ID = "admin"
import { S3Client, ListBucketsCommand , PutObjectCommand , GetObjectCommand} from "@aws-sdk/client-s3";
import { FalAIModel } from "../models/FalAIModel";

const falAiModel = new FalAIModel();
router.post("/training" , async (req , res)=>{
    const parsedBody = TrainModel.safeParse(req.body);
    const images = req.body.images;

    if(!parsedBody.success){
        res.status(411).json({
            message:"Input Incorrect"
        })
        return;
    }

    //@ts-ignore    
    
    const {request_id , response_url} =  falAiModel.trainModel( "", parsedBody.data.name);

    const data = await prismaClient.model.create({

        data:{
            name:parsedBody.data.name,
            type:parsedBody.data.type,
            age:parsedBody.data.age,
            ethinicity:parsedBody.data.ethinicity,
            eyeColor:parsedBody.data.eyeColor,
            bald:parsedBody.data.bald,
            userId:parsedBody.data.userId,
            falAiRequestId:request_id,
            zipURL:parsedBody.data.zipURL,  
        }
    })

    res.status(200).json({
        success:true,
        message:"Model Created Successfully !",
        modelId:data.id
    })

    return;

})


router.post("/generate" , async (req , res)=>{
    const parsedBody = GenerateImage.safeParse(req.body);
    if(!parsedBody.success){
        res.status(411).json({
            success:false,
            message: "Input Incorrect",
        })

        return;
    
    }


    const model = await prismaClient.model.findUnique({
        where:{
            id:parsedBody.data.modelId,
        }
    })

    if(!model || !model.tensorPath){
        res.status(411).json({
            success:false,
            message:"MODEL NOT FOUND !",
        })
        return
    }

    const {request_id , response_url} = await falAiModel.generateImage(parsedBody.data.prompt , model.tensorPath);

    const data = await prismaClient.outputImages.create({
        data:{
            prompt:parsedBody.data.prompt,
            userId:parsedBody.data.userId,  
            modelId:parsedBody.data.modelId,
            falAiRequestId:request_id,
        }
    })

    res.status(200).json({
        success:true,
        data:data,
        imageId : data.id,
    })

    return;


})

export default router;  


