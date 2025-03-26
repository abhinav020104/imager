import express from  "express"
const router = express.Router();
import {PrismaClient} from "@prisma/client"
import {GenerateImage, TrainModel} from "../../../packages/common/types"
const prismaClient = new PrismaClient();  
const USER_ID = "admin"
router.post("/training" , async (req , res)=>{
    const parsedBody = TrainModel.safeParse(req.body)
    if(!parsedBody.success){
        res.status(411).json({
            message:"Input Incorrect"
        })
        return;
    }

    const data = await prismaClient.model.create({

        data:{
            name:parsedBody.data.name,
            type:parsedBody.data.type,
            age:parsedBody.data.age,
            ethinicity:parsedBody.data.ethinicity,
            eyeColor:parsedBody.data.eyeColor,
            bald:parsedBody.data.bald,
            userId:parsedBody.data.userId,
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

    const data = await prismaClient.outputImages.create({
        data:{
            prompt:parsedBody.data.prompt,
            userId:parsedBody.data.userId,  
            modelId:parsedBody.data.modelId,
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

